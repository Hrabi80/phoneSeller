const PDFDocument = require('pdfkit');
const fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');


exports.buildPDF = async (input) => {
	var meeting;
	let paymentAdress = '';
	if(input.meeting == 'office') meeting='at office'; else meeting='shipping';
	var paymentMethod = input.paymentMethod;
	if (paymentMethod == 'paypal') { paymentAdress = input.paymentAdress;}
	if (paymentMethod == 'zelle') { paymentAdress = input.paymentAdress;}
	if (paymentMethod == 'cash') { paymentAdress = '---';}

	const invoice = {
		_id : input._id,
		meeting : meeting,
		paymentMethod:paymentMethod,
		paymentAdress: paymentAdress,
		firstname : input.firstname,
		lastname : input.lastname,
		reciver  : input.username,
		subtotal : input.subTotal,
		shipping: {
			name: input.name,
			address: input.adress,
			city: input.city,
			state: input.state,
			country: 'US',
			postal_code: 94111,
		},
		items: input.items,
	};


	let doc = new PDFDocument({ margin: 50 });
    generateHeader(doc);
	generateCustomerInformation(doc, invoice);
	generateInvoiceTable(doc, invoice);
	generateFooter(doc);
	doc.end();
	const PDFpath = path.resolve(__dirname, `../public/PDFs/${invoice._id}.pdf`);
	var writeStream = fs.createWriteStream(PDFpath);
	writeStream.on('error', function (err) {
		console.log('dfd',err);
	  });
	doc.pipe(fs.createWriteStream(PDFpath));
	var mailAttachment={
		filename: `order.pdf`,
		path: PDFpath,
		reciver : invoice.reciver
	};
	var sendingEmail = await sendEmail(mailAttachment);
	
	return sendingEmail;
}

function generateHeader(doc) {
	doc.image('public/images/logo.jpg', 50, 45, { width: 50 })
		.fillColor('#444444')
		.fontSize(20)
		.text('NationwideVentures', 110, 57)
		.fontSize(10)
		.text('8888 Keystone Crossing Ste 1300', 200, 65, { align: 'right' })
		.text('Indianapolis , IN , 46240', 200, 80, { align: 'right' })
		.moveDown();
		doc.fontSize(10)
		.text("___________________________________________________________________________________________", 50, 100)
}

function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Payment is due when device(s) are received. Thank you for your business.',
		50,
		700,
		{ align: 'center', width: 500 },
	);
}
function generateCustomerInformation(doc, invoice) {
	const shipping = invoice.shipping;
	doc.fontSize(16).text("Hello "+invoice.firstname+" "+invoice.lastname,230,160)
    .fontSize(12).text("Your sale order number is: ",200,180)
	.fontSize(12).text(invoice._id,210,200)
	doc.fontSize(10)
		.text("___________________________________________________________________________________________", 50, 220)
	doc.fontSize(10).text("payment method : "+ invoice.paymentMethod, 50, 280)
		.text(`Placed on : ${new Date()}`, 50, 300)
		.text(`Total price : ${invoice.subtotal} $`, 50, 320)
		.text("Shippment method : "+invoice.meeting, 50, 340)
		// .text(
		// 	`City :${shipping.city}, State :${shipping.state}, Country ${shipping.country}`,
		// 	50,
		// 	320,
		// )
		.moveDown();
}
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
	doc.fontSize(10)
		.text(c1, 50, y)
		.text(c2, 150, y)
		.text(c3, 280, y, { width: 90, align: 'right' })
		.text(c4, 370, y, { width: 90, align: 'right' })
		.text(c5, 0, y, { align: 'right' });
}

function generateInvoiceTable(doc, invoice) {
	doc.fontSize(13)
		.text("product(s)", 50, 370)
		doc.fontSize(13)
		.text("price", 150, 370)
	doc.fontSize(10)
		.text("____________________________", 50, 380)
	let i,
		invoiceTableTop = 370;

	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.name,
			item.price+ "$",
		);
	}
}


sendEmail = async (input) => {

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hrabi.ahmed88@gmail.com',
        pass: 'hihoslmyskwuadiy'
    }
});
const result = await transporter.sendMail({
	from: 'hrabi.ahmed88@gmail.com',
	to: input.reciver,
	subject: 'Nationwideventures order',
	text: 'Order confirmed ',
	html: '<b>Thanks for choosing nationwideventures ! </b><br> Your order is confirmed. Please check the attachment and track your order from our website, we will contact you when we receive your device(s) and pay you back all the shippment costs.<br/>',
			attachments: [
				{
					filename: input.filename,
					path: input.path
				},
			 ]
});

console.log(JSON.stringify(result, null, 4));
}










































sendEmailold = async (input) => {
	const transporter = nodemailer.createTransport({
		//port: 465,       
		service: 'gmail',        // true for 465, false for other ports
	//	host: "smtp.gmail.com",
		   auth: {
				user: 'info@nationwideventures.net',
				pass: 'gtumgspxdnhevjjc',
			 },
		secure: true,
		});

	const mailData = {
		from: 'info@nationwideventures.net',  // sender address
			to: 'quokkaway22@gmail.com',   // list of receivers
			subject: 'Sending Email using Node.js',
			text: 'HELLOO!',
			html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
			attachments: [
				{
					filename: input.filename,
					path: input.path
				},
			 ]
		};
		transporter.sendMail(mailData, function (err, info) {
			if(err)
			  console.log('maiilk erroror',err)
			else
			  console.log('mail info ooooo ==',info);
		 });
}