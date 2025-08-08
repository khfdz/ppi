const ExcelJS = require('exceljs');
const pool = require('../config/database');

const exportMonitoring = async (req, res) => {
  try {
    const { tahun, bulan } = req.query;

    let query = `
      SELECT m.*, 
             i.indikator_isi,
             i.indikator_id,
             MONTH(m.waktu) AS bulan,
             YEAR(m.waktu) AS tahun
      FROM monitoring_benda_tajam m
      JOIN indikators i ON m.indikator_id = i.indikator_id
      WHERE m.user_id = ?
    `;

    const params = [req.user.user_id];

    if (tahun) {
      query += ' AND YEAR(m.waktu) = ?';
      params.push(tahun);
    }
    if (bulan) {
      query += ' AND MONTH(m.waktu) = ?';
      params.push(bulan);
    }

    query += ' ORDER BY i.indikator_id, tahun, bulan, m.minggu';

    const [rows] = await pool.execute(query, params);


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Monitoring');

    const monthNames = [
      '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const bulanTahunSet = new Set();
    const indikatorMap = {};

    rows.forEach(row => {
      const key = `${row.bulan}-${row.tahun}`;
      bulanTahunSet.add(key);

      if (!indikatorMap[row.indikator_id]) {
        indikatorMap[row.indikator_id] = {
          indikator_isi: row.indikator_isi,
          minggu: {},
        };
      }

      if (!indikatorMap[row.indikator_id].minggu[key]) {
        indikatorMap[row.indikator_id].minggu[key] = { 1: '-', 2: '-', 3: '-', 4: '-' };
      }

      indikatorMap[row.indikator_id].minggu[key][row.minggu] = row.nilai === 1 ? 'Ya' : 'Tidak';
    });

    const bulanTahunList = Array.from(bulanTahunSet)
      .map(str => {
        const [bulan, tahun] = str.split('-').map(Number);
        return { key: str, bulan, tahun };
      })
      .sort((a, b) => a.tahun - b.tahun || a.bulan - b.bulan);

    // 🔸 Judul utama
    worksheet.mergeCells('A1:B3');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'MONITORING BENDA TAJAM DAN JARUM';
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    titleCell.font = { bold: true, size: 14 };

    // 🔸 Header bulan dan minggu
    let startCol = 3; // mulai dari kolom C
    bulanTahunList.forEach(({ bulan }) => {
      const monthColStart = startCol;
      const monthColEnd = startCol + 3;

      worksheet.mergeCells(1, monthColStart, 2, monthColEnd);
      worksheet.getCell(1, monthColStart).value = monthNames[bulan];
      worksheet.getCell(1, monthColStart).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(1, monthColStart).font = { bold: true };

      ['Minggu I', 'Minggu II', 'Minggu III', 'Minggu IV'].forEach((minggu, idx) => {
        worksheet.mergeCells(3, monthColStart + idx, 4, monthColStart + idx);
        worksheet.getCell(3, monthColStart + idx).value = minggu;
        worksheet.getCell(3, monthColStart + idx).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(3, monthColStart + idx).font = { bold: true };
      });

      startCol += 4;
    });

    worksheet.getRow(4).getCell(1).value = 'NO';
    worksheet.getRow(4).getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getRow(4).getCell(2).value = 'INDIKATOR';
    worksheet.getRow(4).getCell(2).alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getRow(4).font = { bold: true };
    worksheet.getRow(4).height = 25;



    // 🔸 Isi data mulai baris 5
    let no = 1;
    let rowIndex = 5;
    Object.entries(indikatorMap).sort((a, b) => a[0] - b[0]).forEach(([_, indikator]) => {
      const row = [no++, indikator.indikator_isi];

      bulanTahunList.forEach(({ key }) => {
        const minggu = indikator.minggu[key] || { 1: '-', 2: '-', 3: '-', 4: '-' };
        row.push(minggu[1], minggu[2], minggu[3], minggu[4]);
      });

      worksheet.addRow(row);
      rowIndex++;
    });

    // 🔹 Hitung persentase "Ya" tiap minggu
const totalIndikator = Object.keys(indikatorMap).length;
const persentaseRow = [' ', 'PERSENTASE “YA” (%)'];

bulanTahunList.forEach(({ key }) => {
  const mingguCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

  Object.values(indikatorMap).forEach((indikator) => {
    const minggu = indikator.minggu[key] || {};
    for (let i = 1; i <= 4; i++) {
      if (minggu[i] === 'Ya') {
        mingguCounts[i]++;
      }
    }
  });

  // Hitung persen dan dorong ke persentaseRow
  for (let i = 1; i <= 4; i++) {
    const persen = (mingguCounts[i] / totalIndikator) * 100;
    persentaseRow.push(`${persen.toFixed(1)}%`);
  }
});

// Tambahkan ke worksheet
worksheet.addRow(persentaseRow);

// Style baris persentase
const lastRowIndex = worksheet.lastRow.number;
const lastRow = worksheet.getRow(lastRowIndex);
lastRow.font = { bold: true };

lastRow.eachCell((cell, colNumber) => {
  if (colNumber === 2) {
    cell.alignment = { vertical: 'middle', horizontal: 'left' };
  } else {
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  }

  // Kasih warna abu-abu terang
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE6E6E6' },
  };

  cell.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  };
});


    // 🔹 Alignment: Tengah semua kecuali kolom B
    worksheet.eachRow((row) => {
      row.eachCell((cell, colNumber) => {
        if (colNumber === 2) {
          cell.alignment = { vertical: 'middle' };
        } else {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        }
      });
    });

    // 🔹 Border semua sel
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    // 🔸 Set lebar kolom
// 🔸 Set lebar kolom (PERBAIKI DI SINI)
worksheet.columns = [
  { width: 5 }, // NO
  { width: 50 }, // INDIKATOR – diperkecil agar tidak mepet pinggir kanan layar Excel
  ...bulanTahunList.flatMap(() => [
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
  ]),
];


    // 🔸 Warnai judul utama dan header bulan
    const judulColor = { type: 'pattern', pattern: 'solid', fgColor: { argb: '92D050' } }; // RGB(146, 208, 80)

    // Warna untuk cell A1:B3
    for (let r = 1; r <= 3; r++) {
      for (let c = 1; c <= 2; c++) {
        worksheet.getCell(r, c).fill = judulColor;
      }
    }

    // Warna untuk header bulan di baris 1 dan 2
    let colIndex = 3;
    bulanTahunList.forEach(() => {
      for (let r = 1; r <= 2; r++) {
        for (let c = colIndex; c < colIndex + 4; c++) {
          worksheet.getCell(r, c).fill = judulColor;
        }
      }
      colIndex += 4;
    });

    

    // 🔸 Warna Minggu 1–4 (baris 3 & 4)
    const mingguColors = [
      { argb: 'FFF8CBAD' }, // Minggu I - Kuning terang
      { argb: 'FFF4B183' }, // Minggu II - Kuning sedang
      { argb: 'FFFFC000' }, // Minggu III - Kuning gelap
      { argb: 'FFBF8F00' }, // Minggu IV - Kuning paling gelap
    ];

    let mingguStartCol = 3; // Kolom C

    bulanTahunList.forEach(() => {
      for (let i = 0; i < 4; i++) {
        const col = mingguStartCol + i;

        // Baris 3 dan 4 untuk masing-masing minggu
        worksheet.getCell(3, col).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: mingguColors[i]
        };
        worksheet.getCell(4, col).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: mingguColors[i]
        };
      }
      mingguStartCol += 4;
    });


    // 🔸 Kirim file ke user
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=monitoring.xlsx');

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Export gagal',
    });
  }
};

const exportAmbulance = async (req, res) => {
  try {
    const { tahun, bulan } = req.query;

    let query = `
      SELECT a.*, 
             i.indikator_isi,
             i.indikator_id,
             MONTH(a.waktu) AS bulan,
             YEAR(a.waktu) AS tahun
      FROM monitoring_ambulance a
      JOIN indikators i ON a.indikator_id = i.indikator_id
      WHERE a.user_id = ?
    `;

    const params = [req.user.user_id];

    if (tahun) {
      query += ' AND YEAR(a.waktu) = ?';
      params.push(tahun);
    }
    if (bulan) {
      query += ' AND MONTH(a.waktu) = ?';
      params.push(bulan);
    }

    query += ' ORDER BY i.indikator_id, tahun, bulan, a.minggu';

    const [rows] = await pool.execute(query, params);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ambulance');

    const monthNames = [
      '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const bulanTahunSet = new Set();
    const indikatorMap = {};

    rows.forEach(row => {
      const key = `${row.bulan}-${row.tahun}`;
      bulanTahunSet.add(key);

      if (!indikatorMap[row.indikator_id]) {
        indikatorMap[row.indikator_id] = {
          indikator_isi: row.indikator_isi,
          minggu: {},
        };
      }

      if (!indikatorMap[row.indikator_id].minggu[key]) {
        indikatorMap[row.indikator_id].minggu[key] = { 1: '-', 2: '-', 3: '-', 4: '-' };
      }

      indikatorMap[row.indikator_id].minggu[key][row.minggu] = row.nilai === 1 ? 'Ya' : 'Tidak';
    });

    const bulanTahunList = Array.from(bulanTahunSet)
      .map(str => {
        const [bulan, tahun] = str.split('-').map(Number);
        return { key: str, bulan, tahun };
      })
      .sort((a, b) => a.tahun - b.tahun || a.bulan - b.bulan);

    // 🔸 Judul utama
    worksheet.mergeCells('A1:B3');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'MONITORING AMBULANCE';
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    titleCell.font = { bold: true, size: 14 };

    // 🔸 Header bulan dan minggu
    let startCol = 3; // mulai dari kolom C
    bulanTahunList.forEach(({ bulan }) => {
      const monthColStart = startCol;
      const monthColEnd = startCol + 3;

      worksheet.mergeCells(1, monthColStart, 2, monthColEnd);
      worksheet.getCell(1, monthColStart).value = monthNames[bulan];
      worksheet.getCell(1, monthColStart).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(1, monthColStart).font = { bold: true };

      ['Minggu I', 'Minggu II', 'Minggu III', 'Minggu IV'].forEach((minggu, idx) => {
        worksheet.mergeCells(3, monthColStart + idx, 4, monthColStart + idx);
        worksheet.getCell(3, monthColStart + idx).value = minggu;
        worksheet.getCell(3, monthColStart + idx).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(3, monthColStart + idx).font = { bold: true };
      });

      startCol += 4;
    });

    worksheet.getRow(4).getCell(1).value = 'NO';
    worksheet.getRow(4).getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getRow(4).getCell(2).value = 'INDIKATOR';
    worksheet.getRow(4).getCell(2).alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getRow(4).font = { bold: true };
    worksheet.getRow(4).height = 25;

    // 🔸 Isi data mulai baris 5
    let no = 1;
    let rowIndex = 5;
    Object.entries(indikatorMap).sort((a, b) => a[0] - b[0]).forEach(([_, indikator]) => {
      const row = [no++, indikator.indikator_isi];

      bulanTahunList.forEach(({ key }) => {
        const minggu = indikator.minggu[key] || { 1: '-', 2: '-', 3: '-', 4: '-' };
        row.push(minggu[1], minggu[2], minggu[3], minggu[4]);
      });

      worksheet.addRow(row);
      rowIndex++;
    });

    // 🔹 Hitung persentase "Ya" tiap minggu
    const totalIndikator = Object.keys(indikatorMap).length;
    const persentaseRow = [' ', 'PERSENTASE “YA” (%)'];

    bulanTahunList.forEach(({ key }) => {
      const mingguCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

      Object.values(indikatorMap).forEach((indikator) => {
        const minggu = indikator.minggu[key] || {};
        for (let i = 1; i <= 4; i++) {
          if (minggu[i] === 'Ya') {
            mingguCounts[i]++;
          }
        }
      });

      // Hitung persen dan dorong ke persentaseRow
      for (let i = 1; i <= 4; i++) {
        const persen = (mingguCounts[i] / totalIndikator) * 100;
        persentaseRow.push(`${persen.toFixed(1)}%`);
      }
    });

    // Tambahkan ke worksheet
    worksheet.addRow(persentaseRow);

    // Style baris persentase
    const lastRowIndex = worksheet.lastRow.number;
    const lastRow = worksheet.getRow(lastRowIndex);
    lastRow.font = { bold: true };

    lastRow.eachCell((cell, colNumber) => {
      if (colNumber === 2) {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      } else {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }

      // Kasih warna abu-abu terang
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE6E6E6' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // 🔹 Alignment: Tengah semua kecuali kolom B
    worksheet.eachRow((row) => {
      row.eachCell((cell, colNumber) => {
        if (colNumber === 2) {
          cell.alignment = { vertical: 'middle' };
        } else {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        }
      });
    });

    // 🔹 Border semua sel
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    // 🔸 Set lebar kolom
    worksheet.columns = [
      { width: 5 }, // NO
      { width: 50 }, // INDIKATOR
      ...bulanTahunList.flatMap(() => [
        { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
      ]),
    ];

    // 🔸 Warnai judul utama dan header bulan
    const judulColor = { type: 'pattern', pattern: 'solid', fgColor: { argb: '92D050' } }; // RGB(146, 208, 80)

    // Warna untuk cell A1:B3
    for (let r = 1; r <= 3; r++) {
      for (let c = 1; c <= 2; c++) {
        worksheet.getCell(r, c).fill = judulColor;
      }
    }

    // Warna untuk header bulan di baris 1 dan 2
    let colIndex = 3;
    bulanTahunList.forEach(() => {
      for (let r = 1; r <= 2; r++) {
        for (let c = colIndex; c < colIndex + 4; c++) {
          worksheet.getCell(r, c).fill = judulColor;
        }
      }
      colIndex += 4;
    });

    // 🔸 Warna Minggu 1–4 (baris 3 & 4)
    const mingguColors = [
      { argb: 'FFF8CBAD' }, // Minggu I - Kuning terang
      { argb: 'FFF4B183' }, // Minggu II - Kuning sedang
      { argb: 'FFFFC000' }, // Minggu III - Kuning gelap
      { argb: 'FFBF8F00' }, // Minggu IV - Kuning paling gelap
    ];

    let mingguStartCol = 3; // Kolom C

    bulanTahunList.forEach(() => {
      for (let i = 0; i < 4; i++) {
        const col = mingguStartCol + i;

        // Baris 3 dan 4 untuk masing-masing minggu
        worksheet.getCell(3, col).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: mingguColors[i]
        };
        worksheet.getCell(4, col).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: mingguColors[i]
        };
      }
      mingguStartCol += 4;
    });

    // 🔸 Kirim file ke user
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=ambulance.xlsx');

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Export gagal',
    });
  }
};

const exportMedis = async (req, res) => {
  try {
    const { tahun, bulan } = req.query;

    let query = `
      SELECT a.*, 
             i.indikator_isi,
             i.indikator_id,
             MONTH(a.waktu) AS bulan,
             YEAR(a.waktu) AS tahun
      FROM monitoring_medis a
      JOIN indikators i ON a.indikator_id = i.indikator_id
      WHERE a.user_id = ?
    `;

    const params = [req.user.user_id];

    if (tahun) {
      query += ' AND YEAR(a.waktu) = ?';
      params.push(tahun);
    }
    if (bulan) {
      query += ' AND MONTH(a.waktu) = ?';
      params.push(bulan);
    }

    query += ' ORDER BY i.indikator_id, tahun, bulan, a.minggu';

    const [rows] = await pool.execute(query, params);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Medis');

    const monthNames = [
      '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const bulanTahunSet = new Set();
    const indikatorMap = {};

    rows.forEach(row => {
      const key = `${row.bulan}-${row.tahun}`;
      bulanTahunSet.add(key);

      if (!indikatorMap[row.indikator_id]) {
        indikatorMap[row.indikator_id] = {
          indikator_isi: row.indikator_isi,
          minggu: {},
        };
      }

      if (!indikatorMap[row.indikator_id].minggu[key]) {
        indikatorMap[row.indikator_id].minggu[key] = { 1: '-', 2: '-', 3: '-', 4: '-' };
      }

      indikatorMap[row.indikator_id].minggu[key][row.minggu] = row.nilai === 1 ? 'Ya' : 'Tidak';
    });

    const bulanTahunList = Array.from(bulanTahunSet)
      .map(str => {
        const [bulan, tahun] = str.split('-').map(Number);
        return { key: str, bulan, tahun };
      })
      .sort((a, b) => a.tahun - b.tahun || a.bulan - b.bulan);

    // 🔸 Judul utama
    worksheet.mergeCells('A1:B3');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'MONITORING MEDIS';
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    titleCell.font = { bold: true, size: 14 };

    // 🔸 Header bulan dan minggu
    let startCol = 3; // mulai dari kolom C
    bulanTahunList.forEach(({ bulan }) => {
      const monthColStart = startCol;
      const monthColEnd = startCol + 3;

      worksheet.mergeCells(1, monthColStart, 2, monthColEnd);
      worksheet.getCell(1, monthColStart).value = monthNames[bulan];
      worksheet.getCell(1, monthColStart).alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell(1, monthColStart).font = { bold: true };

      ['Minggu I', 'Minggu II', 'Minggu III', 'Minggu IV'].forEach((minggu, idx) => {
        worksheet.mergeCells(3, monthColStart + idx, 4, monthColStart + idx);
        worksheet.getCell(3, monthColStart + idx).value = minggu;
        worksheet.getCell(3, monthColStart + idx).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(3, monthColStart + idx).font = { bold: true };
      });

      startCol += 4;
    });

    worksheet.getRow(4).getCell(1).value = 'NO';
    worksheet.getRow(4).getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getRow(4).getCell(2).value = 'INDIKATOR';
    worksheet.getRow(4).getCell(2).alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getRow(4).font = { bold: true };
    worksheet.getRow(4).height = 25;

    // 🔸 Isi data mulai baris 5
    let no = 1;
    let rowIndex = 5;
    Object.entries(indikatorMap).sort((a, b) => a[0] - b[0]).forEach(([_, indikator]) => {
      const row = [no++, indikator.indikator_isi];

      bulanTahunList.forEach(({ key }) => {
        const minggu = indikator.minggu[key] || { 1: '-', 2: '-', 3: '-', 4: '-' };
        row.push(minggu[1], minggu[2], minggu[3], minggu[4]);
      });

      worksheet.addRow(row);
      rowIndex++;
    });

    // 🔹 Hitung persentase "Ya" tiap minggu
    const totalIndikator = Object.keys(indikatorMap).length;
    const persentaseRow = [' ', 'PERSENTASE “YA” (%)'];

    bulanTahunList.forEach(({ key }) => {
      const mingguCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

      Object.values(indikatorMap).forEach((indikator) => {
        const minggu = indikator.minggu[key] || {};
        for (let i = 1; i <= 4; i++) {
          if (minggu[i] === 'Ya') {
            mingguCounts[i]++;
          }
        }
      });

      // Hitung persen dan dorong ke persentaseRow
      for (let i = 1; i <= 4; i++) {
        const persen = (mingguCounts[i] / totalIndikator) * 100;
        persentaseRow.push(`${persen.toFixed(1)}%`);
      }
    });

    // Tambahkan ke worksheet
    worksheet.addRow(persentaseRow);

    // Style baris persentase
    const lastRowIndex = worksheet.lastRow.number;
    const lastRow = worksheet.getRow(lastRowIndex);
    lastRow.font = { bold: true };

    lastRow.eachCell((cell, colNumber) => {
      if (colNumber === 2) {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      } else {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }

      // Kasih warna abu-abu terang
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE6E6E6' },
      };

      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // 🔹 Alignment: Tengah semua kecuali kolom B
    worksheet.eachRow((row) => {
      row.eachCell((cell, colNumber) => {
        if (colNumber === 2) {
          cell.alignment = { vertical: 'middle' };
        } else {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        }
      });
    });

    // 🔹 Border semua sel
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    // 🔸 Set lebar kolom
    worksheet.columns = [
      { width: 5 }, // NO
      { width: 50 }, // INDIKATOR
      ...bulanTahunList.flatMap(() => [
        { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
      ]),
    ];

    // 🔸 Warnai judul utama dan header bulan
    const judulColor = { type: 'pattern', pattern: 'solid', fgColor: { argb: '92D050' } }; // RGB(146, 208, 80)

    // Warna untuk cell A1:B3
    for (let r = 1; r <= 3; r++) {
      for (let c = 1; c <= 2; c++) {
        worksheet.getCell(r, c).fill = judulColor;
      }
    }

    // Warna untuk header bulan di baris 1 dan 2
    let colIndex = 3;
    bulanTahunList.forEach(() => {
      for (let r = 1; r <= 2; r++) {
        for (let c = colIndex; c < colIndex + 4; c++) {
          worksheet.getCell(r, c).fill = judulColor;
        }
      }
      colIndex += 4;
    });

    // 🔸 Warna Minggu 1–4 (baris 3 & 4)
    const mingguColors = [
      { argb: 'FFF8CBAD' }, // Minggu I - Kuning terang
      { argb: 'FFF4B183' }, // Minggu II - Kuning sedang
      { argb: 'FFFFC000' }, // Minggu III - Kuning gelap
      { argb: 'FFBF8F00' }, // Minggu IV - Kuning paling gelap
    ];

    let mingguStartCol = 3; // Kolom C

    bulanTahunList.forEach(() => {
      for (let i = 0; i < 4; i++) {
        const col = mingguStartCol + i;

        // Baris 3 dan 4 untuk masing-masing minggu
        worksheet.getCell(3, col).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: mingguColors[i]
        };
        worksheet.getCell(4, col).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: mingguColors[i]
        };
      }
      mingguStartCol += 4;
    });

    // 🔸 Kirim file ke user
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=medis.xlsx');

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Export gagal',
    });
  }
};

module.exports = { 
  exportMonitoring, 
  exportAmbulance,
  exportMedis
};
