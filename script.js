document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // جلب القيم
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const serviceType = document.getElementById('serviceType').options[document.getElementById('serviceType').selectedIndex].text;
    const message = document.getElementById('message').value;

    // تجهيز نص الرسالة
    const rawText = `السلام عليكم (ابن سويد للسفريات والسياحة)، أرغب في طلب خدمة / استفسار:\n` +
                    `- الاسم: ${fullName}\n` +
                    `- رقم الهاتف: ${phone}\n` +
                    `- الخدمة المطلوبة: ${serviceType}\n` +
                    `- ملاحظات: ${message}`;

    const encodedText = encodeURIComponent(rawText);
    
    // الرقم الموحد
    const whatsappNumber = "967774642465";

    // رابط الواتساب التفاعلي
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;
    
    window.open(whatsappURL, '_blank');
});