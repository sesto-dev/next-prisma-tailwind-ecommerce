export default function getPrologue({ subject }) {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta
					http-equiv="Content-Type"
					content="text/html; charset=utf-8"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>

				<title>${subject}</title>
				<style type="text/css">
					#outlook a {
						padding: 0;
					}

					body {
						width: 100% !important;
						margin: 0;
						padding: 0;
						-webkit-text-size-adjust: 100%;
						-ms-text-size-adjust: 100%;
					}

					.ExternalClass {
						width: 100%;
					}

					.ExternalClass,
					.ExternalClass p,
					.ExternalClass span,
					.ExternalClass font,
					.ExternalClass td,
					.ExternalClass div {
						line-height: 100%;
					}

					#backgroundTable {
						margin: 0;
						padding: 0;
						width: 100% !important;
						line-height: 100% !important;
					}

					img {
						outline: none;
						text-decoration: none;
						-ms-interpolation-mode: bicubic;
					}

					a img {
						border: none;
					}

					.image_fix {
						display: block;
					}

					p {
						margin: 1em 0;
					}

					h1,
					h2,
					h3,
					h4,
					h5,
					h6 {
						color: black !important;
					}

					h1 a,
					h2 a,
					h3 a,
					h4 a,
					h5 a,
					h6 a {
						color: blue !important;
					}

					h1 a:active,
					h2 a:active,
					h3 a:active,
					h4 a:active,
					h5 a:active,
					h6 a:active {
						color: red !important;
					}

					h1 a:visited,
					h2 a:visited,
					h3 a:visited,
					h4 a:visited,
					h5 a:visited,
					h6 a:visited {
						color: #000;
						color: purple !important;
					}

					table td {
						border-collapse: collapse;
					}

					table {
						border-collapse: collapse;
						mso-table-lspace: 0pt;
						mso-table-rspace: 0pt;
					}

					* {
						margin: 0;
						padding: 0;
					}

					body {
						-webkit-text-size-adjust: 100%;
						-ms-text-size-adjust: 100%;
						width: 100% !important;
						height: 100%;
						font-family: Cambria, Utopia, 'Liberation Serif', Times,
							'Times New Roman', serif;
						font-size: 100%;
						line-height: 1.6;
					}

					a {
						color: #348eda;
					}

					h1,
					h2,
					h3,
					h4,
					h5,
					p,
					ul,
					ol {
						font-family: Cambria, Utopia, 'Liberation Serif', Times,
							'Times New Roman', serif;
					}

					h1,
					h2,
					h3,
					h4,
					h5 {
						margin: 20px 0 10px;
						color: #000;
						line-height: 1.2;
					}

					h1 {
						font-size: 32px;
					}
					h2 {
						font-size: 26px;
					}
					h3 {
						font-size: 22px;
					}
					h4 {
						font-size: 18px;
					}
					h5 {
						font-size: 16px;
					}

					p,
					ul,
					ol {
						margin-bottom: 10px;
						font-weight: normal;
						font-size: 16px;
						line-height: 1.4;
					}

					ul li,
					ol li {
						margin-left: 5px;
						list-style-position: inside;
					}

					table.body-wrap {
						width: 100%;
						padding: 30px;
					}

					table.footer-wrap {
						width: 100%;
						clear: both !important;
					}

					.footer-wrap .container p {
						font-size: 12px;
						color: #666;
					}

					table.footer-wrap a {
						color: #999;
					}

					.container {
						display: block !important;
						max-width: 600px !important;
						margin: 0 auto !important;
						clear: both !important;
					}

					.body-wrap .container {
						padding: 30px;
					}

					.content {
						max-width: 600px;
						margin: 0 auto;
						display: block;
						text-align: justify;
						text-justify: inter-word;
					}

					.content table {
						width: 100%;
					}
				</style>
				<!--[if gte mso 9]>
					<style>
						/* Target Outlook 2007 and 2010 */
					</style>
				<![endif]-->
			</head>
			<body>
				<table
					id="backgroundTable"
					cellpadding="0"
					cellspacing="0"
					border="0"
				>
					<tr>
						<td>
							<!-- body -->
							<table class="body-wrap">
								<tr>
									<td></td>
									<td
										class="container"
										bgcolor="#FFFFFF"
										valign="top"
									>
										<!-- content -->
										<div class="content">
											<table>
												<tr>
													<td>
														<h1>
															Oneli
														</h1>`
}
