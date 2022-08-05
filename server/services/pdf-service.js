const PDFDocument = require('pdfkit');
const fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');


exports.buildPDF = async (input) => {
// function buildPDF(input){
	var meeting;
	if(input.meeting = 'office') meeting='at office'; else meeting='shipping';
	var paymentMethod = input.paymentMethod;
	if (paymentMethod = 'paypal') {const paymentAdress = input.paymentAdress;}
	if (paymentMethod = 'zelle') {const paymentAdress = input.paymentAdress;}
	if (paymentAdress = 'cash') {const paymentAdress = '---';}
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
			address: '1234 Main Street',
			city: 'San Francisco',
			state: 'CA',
			country: 'US',
			postal_code: 94111,
		},
		items: input.items,
	};



	let doc = new PDFDocument({ margin: 50 });

    generateHeader(doc);
// 	doc.fontSize(27)
//    .font('fonts/Chalkboard.ttc', 'Chalkboard-Bold')
//    .text('Order Confirmation', 100, 100);
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
		.text('123 Main Street', 200, 65, { align: 'right' })
		.text('New York, NY, 10025', 200, 80, { align: 'right' })
		.moveDown();
}

function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Payment is due within 15 days. Thank you for your business.',
		50,
		780,
		{ align: 'center', width: 500 },
	);
}
function generateCustomerInformation(doc, invoice) {
	const shipping = invoice.shipping;

	doc.text(`Invoice Number: '---'`, 50, 200)
		.text(`Invoice Date: ${new Date()}`, 50, 215)
		.text(`Balance Due: ${invoice.subtotal}`, 50, 130)

		.text(invoice.firstname + ' '+ invoice.lastname, 300, 200)
		.text(shipping.address, 300, 215)
		.text(
			`${shipping.city}, ${shipping.state}, ${shipping.country}`,
			300,
			130,
		)
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
	let i,
		invoiceTableTop = 330;

	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.name,
			item.price,
			// item.amount / item.quantity,
			// item.quantity,
			// item.amount,
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
	to: 'quokkaway22@gmail.com',
	to: input.reciver,
	subject: 'Hello World',
	text: 'Hello World',
	html: '<b>Hey there! </b><br> This is a test message sent with Nodemailer<br/>',
			attachments: [
				{
					filename: input.filename,
					path: input.path
				},
			 ]
});

console.log(JSON.stringify(result, null, 4));
}



//send();

// async function send() {
//     const result = await transporter.sendMail({
//         from: 'hrabi.ahmed80@gmail.com',
//         to: 'quokkaway22@gmail.com',
//         subject: 'Hello World',
//         text: 'Hello World'
//     });

//     console.log(JSON.stringify(result, null, 4));
// }

sendEmailold = async (input) => {
	const transporter = nodemailer.createTransport({
		//port: 465,       
		service: 'gmail',        // true for 465, false for other ports
	//	host: "smtp.gmail.com",
		   auth: {
				user: 'hrabi.ahmed80@gmail.com',
				pass: 'gtumgspxdnhevjjc',
			 },
		secure: true,
		});

	const mailData = {
		from: 'hrabi.ahmed80@gmail.com',  // sender address
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