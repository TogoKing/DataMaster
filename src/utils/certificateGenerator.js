import jsPDF from 'jspdf';

/**
 * Génère un certificat PDF professionnel selon le design fourni
 * Couleurs principales : Blanc, Orange (#FF6B00), Bleu (#1E3A8A)
 */
export const generateCertificate = (certificateData) => {
  const { userName, courseName, instructor, date, certificateId } = certificateData;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Colors from the certificate design
  const primaryColor = [255, 107, 0]; // Orange (#FF6B00) - Main accent
  const secondaryColor = [30, 58, 138]; // Dark blue (#1E3A8A)
  const goldColor = [218, 165, 32]; // Gold for decorations
  const darkText = [33, 37, 41]; // Dark gray for text
  const lightText = [108, 117, 125]; // Light gray for secondary text
  const whiteColor = [255, 255, 255];

  // Background - White base
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative orange header bar
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 15, 'F');

  // Decorative blue footer bar
  doc.setFillColor(...secondaryColor);
  doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');

  // Decorative corner borders with gold
  doc.setDrawColor(...goldColor);
  doc.setLineWidth(2);
  
  // Outer border
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Inner border with orange
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Decorative corner ornaments
  const cornerSize = 8;
  doc.setFillColor(...primaryColor);
  
  // Top left corner decoration
  doc.triangle(10, 10, 10 + cornerSize, 10, 10, 10 + cornerSize, 'F');
  // Top right corner decoration
  doc.triangle(pageWidth - 10, 10, pageWidth - 10 - cornerSize, 10, pageWidth - 10, 10 + cornerSize, 'F');
  // Bottom left corner decoration
  doc.triangle(10, pageHeight - 10, 10 + cornerSize, pageHeight - 10, 10, pageHeight - 10 - cornerSize, 'F');
  // Bottom right corner decoration
  doc.triangle(pageWidth - 10, pageHeight - 10, pageWidth - 10 - cornerSize, pageHeight - 10, pageWidth - 10, pageHeight - 10 - cornerSize, 'F');

  // Header text - Centered below orange bar
  doc.setFontSize(12);
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICAT DE FORMATION', pageWidth / 2, 30, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(...lightText);
  doc.setFont('helvetica', 'normal');
  doc.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 38, { align: 'center' });

  // Decorative line under header
  doc.setDrawColor(...goldColor);
  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 50, 42, pageWidth / 2 + 50, 42);

  // "This is to certify that" - English
  doc.setFontSize(11);
  doc.setTextColor(...lightText);
  doc.text('This is to certify that', pageWidth / 2, 55, { align: 'center' });

  // Student name - Large and prominent
  doc.setFontSize(28);
  doc.setTextColor(...secondaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text(userName, pageWidth / 2, 70, { align: 'center' });

  // Decorative line under name with gold
  doc.setDrawColor(...goldColor);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 80, 75, pageWidth / 2 + 80, 75);

  // "has successfully completed" - French and English
  doc.setFontSize(11);
  doc.setTextColor(...lightText);
  doc.setFont('helvetica', 'normal');
  doc.text('a successfully completed / a validé avec succès', pageWidth / 2, 88, { align: 'center' });

  // Course name - Prominent
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text(courseName, pageWidth / 2, 105, { align: 'center' });

  // Training program label
  doc.setFontSize(10);
  doc.setTextColor(...lightText);
  doc.setFont('helvetica', 'normal');
  doc.text('Training Program / Programme de Formation', pageWidth / 2, 112, { align: 'center' });

  // Instructor and date info
  doc.setFontSize(10);
  doc.setTextColor(...darkText);
  doc.text(`Instructor / Formateur: ${instructor}`, pageWidth / 2, 130, { align: 'center' });
  doc.text(`Date of Issue / Date de délivrance: ${date}`, pageWidth / 2, 137, { align: 'center' });

  // Certificate ID
  doc.setFontSize(8);
  doc.setTextColor(...lightText);
  doc.text(`Certificate ID: ${certificateId}`, pageWidth / 2, 148, { align: 'center' });

  // Signature section - Left side
  doc.setDrawColor(...darkText);
  doc.setLineWidth(0.3);
  doc.line(50, 165, 110, 165);
  doc.setFontSize(9);
  doc.setTextColor(...darkText);
  doc.text('Instructor Signature', 80, 172, { align: 'center' });

  // Signature section - Right side
  doc.line(pageWidth - 110, 165, pageWidth - 50, 165);
  doc.text('Program Director', pageWidth - 80, 172, { align: 'center' });

  // DataMaster branding in footer
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('DataMaster', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // DataMaster logo placeholder - Orange circle with DM text
  doc.setFillColor(...primaryColor);
  doc.circle(pageWidth / 2, 82, 6, 'F');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('DM', pageWidth / 2, 83, { align: 'center' });

  // Congratulations message
  doc.setFontSize(10);
  doc.setTextColor(...primaryColor);
  doc.text('Félicitations ! Congratulations!', pageWidth / 2, 122, { align: 'center' });

  return doc;
};

/**
 * Télécharge le certificat PDF
 */
export const downloadCertificate = (certificateData) => {
  const doc = generateCertificate(certificateData);
  const fileName = `Certificat_${certificateData.courseName.replace(/\s+/g, '_')}_${certificateData.userName.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};

/**
 * Génère le blob du certificat pour envoi par email
 */
export const getCertificateBlob = (certificateData) => {
  const doc = generateCertificate(certificateData);
  return doc.output('blob');
};

/**
 * Génère les données du certificat
 */
export const createCertificateData = (userName, courseName, instructor = 'DataMaster Team') => {
  const certificateId = `DM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const date = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    userName,
    courseName,
    instructor,
    date,
    certificateId
  };
};
