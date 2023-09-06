export default function getNewStyle({ name, subject }) {
   const html = String.raw

   return html`
   <html>
   <head>
   <style type="text/css">
   
       h4 
       {
           text-align: left;
       }
   
   @media screen 
   {
   
       .headerLineTitle
       {
           width:1.5in;
           display:inline-block;
           margin:0in;
           margin-bottom:.0001pt;
           font-size:11.0pt;
           font-family:"Calibri","sans-serif";
           font-weight:bold;
       }
   
       .headerLineText
       {
           display:inline;
           margin:0in;
           margin-bottom:.0001pt;
           font-size:11.0pt;
           font-family:"Calibri","sans-serif";
           font-weight:normal;
       }
   
      .pageHeader
      {
           font-size:14.0pt;
           font-family:"Calibri","sans-serif";
           font-weight:bold;
           visibility:hidden;
           display:none;
      }   
   }
   
   @media print 
   {
       .headerLineTitle
       {
           width:1.5in;
           display:inline-block;
           margin:0in;
           margin-bottom:.0001pt;
           font-size:11.0pt;
           font-family:"Calibri","sans-serif";
           font-weight:bold;
       }
   
       .headerLineText
       {
           display:inline;
           margin:0in;
           margin-bottom:.0001pt;
           font-size:11.0pt;
           font-family:"Calibri","sans-serif";
           font-weight:normal;
       }
   
      .pageHeader
      {
           font-size:14.0pt;
           font-family:"Calibri","sans-serif";
           font-weight:bold;
           visibility:visible;
           display:block;
      }
   
   }
   </style>
   </head>
   
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns=http://www.w3.org/1999/xhtml xmlns:v=urn:schemas-microsoft-com:vml xmlns:o=urn:schemas-microsoft-com:office:office lang=en>
   <head>
   <meta charset=utf-8">
     <!--[if !mso]><!-->
     <meta http-equiv=X-UA-Compatible content=IE=edge />
     <!--<![endif]-->
     <meta name=viewport content="width=device-width, initial-scale=1.0" />
     <meta name=viewport content="width=device-width; initial-scale=1;" />
     <meta name=color-scheme content="light dark">
   <meta name=supported-color-schemes content="light dark">
      <meta name=viewport content=target-densitydpi=device-dpi />
      <meta name=x-apple-disable-message-reformatting />
     <link href=https://fonts.googleapis.com/css?family=Roboto:400,bold,700 rel=stylesheet />
     <link href=https://fonts.googleapis.com/css?family=Google+Sans:400,300,500,700 />
   <style type=text/css>
   <style> * {
   -webkit-font-smoothing: antialiased;
       -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      -webkit-text-size: 100%;
      -ms-text-size: 100%;
     }
   u + .body .gmail_hack{
     display:block !important;
     }
   table {
     border-spacing: 0;
     color: #444444;
     font-family: Arial, sans-serif;
     }
     .desktop-only-br{display:table};
   </style>
      <style>
   @media only screen and (max-width: 480px){
    .wrap-inner{width:100% !important; max-width:100% !important;}
     .hero_mob{width:100% !important;}
     .hero{width:100% !important;}
     .two_column_mob{width:100% !important;}
     .mob_img{text-align:left !important;}
     .mob_show{width:100% !important; display:table!important; margin: 0 auto !important;}
     .mob_hide{display:none !important;}
     .logo_mob_img{text-align:center !important;padding-left:0px  !important;padding-right:0px  !important; }
     .cta_class{text-align:left !important;}
     .page_mob_img{text-align:left !important;width:90px !important;}
     .prompt_mob_img{text-align:center !important;width:190px !important;}
     .hero_headline{padding-left:32px !important;padding-right:32px !important;padding-top:24px !important;padding-bottom:8px !important;font-size: 32px !important;line-height: 39px !important;letter-spacing: -0.75px !important;}
     .hero_headline1{
       padding-top:0px !important;
     }
     .hero_subheadline{padding-left:32px !important;padding-right:32px !important;padding-bottom:18px !important;}
     .mob_cta{padding-left:32px !important; text-align:left  !important;}
     .mob_footer{padding-left:32px !important;padding-right:32px !important;}
     .mob_footer_1{padding-left:32px !important;padding-right:32px !important;padding-bottom:15px !important;}
     .mob_mail_headline{font-size:28px !important; line-height:36px !important;padding-left:32px !important; padding-top:30px !important;padding-bottom:4px !important;padding-right:80px !important; }
     .mob_mail_subheadline{font-size:14px !important; line-height:21px !important;padding-left:32px !important;padding-top:4px !important;    padding-right: 64px !important;}
     .mail_mob_bg{padding-right:30px !important;}
     .mob_mail_cta{padding-left:32px !important;}
     .blue_mob_mail_headline{font-size:20px !important; line-height:30px !important;padding-left:30px !important; padding-top:32px !important;padding-bottom:8px !important;padding-right: 32px !important; }
     .blue_mob_mail_subheadline{font-size:14px !important; line-height:21px !important;padding-left:30px !important; padding-top:8px !important;padding-bottom:8px !important;padding-right: 32px !important; }
     .blue_mob_mail_subline{font-size:8px !important; line-height:12px !important;padding-left:30px !important; padding-top:0px !important;padding-bottom:32px !important;padding-right: 32px !important;}
     .blue_left{padding-left:19px !important;}
     .cta_mob{width: 100% !important;
       display: inline-block !important;}
     .show_on_device_table{
     display:table!important;
   }
   
     
     .desktop-only-br{ display:none!important; }
     .sign_off_text{
       padding-left: 32px !important;
       padding-right: 32px !important;
       padding-bottom: 0px !important;
     }
     .border_mob{
       border: none !important;
     }
     .logo_left_pad{padding-right: 85px !important;}
     .bg_img_mob{
       display:block !important;
     }
     .bg_img_desk{
       display:none !important;
     }
     .bg_padd{
       padding-left:50px !important;
       padding-right:50px !important;
       padding-top:8px !important;
     }
     .mobile_only{height:auto!important;overflow:visible!important;display:table!important;max-height:inherit!important;font-size:inherit!important;line-height:inherit!important;}
     
     .mob_td_width{
       width:400px !important;
      }
   
     
   }
   
    @media screen and (min-width:481px) and (max-width:960px){
    .wrap-inner{width:100% !important; max-width:100% !important;}
     .hero_mob{width:100% !important;}
     .hero{width:100% !important;}
     .two_column_mob{width:100% !important;}
     .mob_img{text-align:left !important;}
     .mob_show{width:100% !important; display:table!important; margin: 0 auto !important;}
     .mob_hide{display:none !important;}
     .logo_mob_img{text-align:center !important;padding-left:0px  !important;padding-right:0px  !important; }
     .cta_class{text-align:left !important;}
     .page_mob_img{text-align:left !important;width:90px !important;}
     .prompt_mob_img{text-align:center !important;width:190px !important;}
     .hero_headline{padding-left:32px !important;padding-right:32px !important;padding-top:24px !important;padding-bottom:8px !important;font-size: 32px !important;line-height: 39px !important;letter-spacing: -0.75px !important;}
      .hero_headline1{
        padding-top:0px !important;
      }
     .hero_subheadline{padding-left:32px !important;padding-right:32px !important;padding-bottom:18px !important;}
     .mob_cta{padding-left:32px !important; text-align:left  !important;}
     .mob_footer{padding-left:32px !important;padding-right:32px !important;}
     .mob_footer_1{padding-left:32px !important;padding-right:32px !important;padding-bottom:15px !important;}
     .mob_mail_headline{font-size:28px !important; line-height:36px !important;padding-left:32px !important; padding-top:30px !important;padding-bottom:4px !important;padding-right:80px !important; }
     .mob_mail_subheadline{font-size:14px !important; line-height:21px !important;padding-left:32px !important;padding-top:4px !important;    padding-right: 64px !important;}
     .mail_mob_bg{padding-right:30px !important;}
     .mob_mail_cta{padding-left:32px !important;}
     .blue_mob_mail_headline{font-size:20px !important; line-height:30px !important;padding-left:30px !important; padding-top:32px !important;padding-bottom:8px !important;padding-right: 32px !important; }
     .blue_mob_mail_subheadline{font-size:14px !important; line-height:21px !important;padding-left:30px !important; padding-top:8px !important;padding-bottom:8px !important;padding-right: 32px !important; }
     .blue_mob_mail_subline{font-size:8px !important; line-height:12px !important;padding-left:30px !important; padding-top:0px !important;padding-bottom:32px !important;padding-right: 32px !important;}
     .blue_left{padding-left:19px !important;}
     .cta_mob{width: 100% !important;
       display: inline-block !important;}
     .show_on_device_table{
     display:table!important;
   }
   
     
     .desktop-only-br{ display:none!important; }
     .sign_off_text{
       padding-left: 32px !important;
       padding-right: 32px !important;
       padding-bottom: 0px !important;
     }
     .border_mob{
       border: none !important;
     }
     .logo_left_pad{padding-right: 85px !important;}
     .bg_img_mob{
       display:block !important;
       padding-left: 0px;
     }
     .bg_img_desk{
       display:none !important;
     }
     .bg_padd{
       padding-left:140px !important;
       padding-right:140px !important;
       padding-top:45px !important;
       padding-bottom: 144px !important;
      
     }
   
      .mob_td_width{
        width:600px !important;
      }
        }
        
   @media screen and (max-width:365px){
   }
     
   :root {
   color-scheme: light dark;
   supported-color-schemes: light dark;
   }
   @media (prefers-color-scheme: dark ) {
   .wrap-inner { background-color: #121212 !important; }
     div, table, td, center {
       background-color: transparent !important;
   }
     td, h1, h2, h3, h4, h5, h6, h7, p, div, .eaddress {
       color: #ffffff !important;
   }
    body {
       background-color: #272623 !important;
   }
   }
   
    
     </style>
   </style>
   <title>${subject}</title>
   
   <div style="display:none; font-size:1px; color:#333333; line-height:10px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">Meet your creative and helpful collaborator</div>
   <div style="font-size: 0px; line-height:0px; color: #ffffff; display: none;">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; </div>
   <center class=wrapper-inner style=width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;>
   <section>
   <table role=presentation bgcolor=#FFFFFF class=wrap-inner cellspacing=0 cellpadding=0 border=0 width=720 align=center style="border-spacing:0; border:0; border-collapse:collapse; font-family:Roboto, Arial, sans-serif;color:#444444;Margin:0 auto;width: 720px; max-width: 720px;">
   <tr>
     <td style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
      padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
    border: 1px solid #DADCE0;">
     
     <table bgcolor=#ffffff class=hero_mob role=presentation cellpadding=0 cellspacing=0 border=0 width=100% style=width:100%;>
       <tr>
         <td class=page_mob_img align=left style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
    vertical-align: top">
           <!--[if gte mso]>
             <img class="page_mob_img" src="https://www.gstatic.com/gumdrop/files/bard-rotating-circle-desk-static-transparent-w360px-h180px-2x.png"  width="180"  style=" vertical-align: top">
           <![endif]-->
           <!--[if !mso]><!-->
             <img class=page_mob_img src=https://www.gstatic.com/gumdrop/files/bard-rotating-circle-desk-animated-transparent-w540px-h270px-2x.gif width=180 style="">
           <!--<![endif]-->
         </td>
         <td align=center style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
   ">
           <table bgcolor=#ffffff class=hero_mob role=presentation cellpadding=0 cellspacing=0 border=0 width=100% style=width:100%;>
             <tr>
               <td class=logo_left_pad align=center style="padding-bottom: 28px; mso-padding-alt: 48px 309px 10px 120px;">
                 ${name}
               </td>
             </tr>
           </table>
         </td>
       </tr>
     </table>
   
   <table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100% class=hero style=width:100%>
   
   
     <tr>
           <td align=center dir=ltr class="hero_headline hero_headline1" colspan=1 style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
    color:#000000; font-size:40px; font-weight:bold; font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif; line-height:48px; padding-top:0px; padding-bottom:12px;letter-spacing:-1.2px;text-align:center;direction:ltr;padding-left:80px;padding-right:80px;padding-top:7px;mso-padding-top-alt:18px;">
      
         <!--[if mso]><font face="Arial,sans-serif"><![endif]-->Get started <br class="mobile_only " style=display:none;>with <span style="white-space: nowrap !important;">${name}</span>
       </td>
     </tr>
   
     <tr>
           <td align=center dir=ltr class=hero_subheadline colspan=1 style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
    color:#3C4043; font-size:14px; font-weight:normal; font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif; line-height:21px; padding-top:0px; padding-bottom:24px;letter-spacing:0.2px;text-align:center;direction:ltr;padding-left:105px;padding-right:105px;">
      
         <!--[if mso]><font face="Arial,sans-serif"><![endif]-->${subject}
       </td>
     </tr>
    
   <tr>
   <td class=mob_hide align=center width=690 style="width:690px;text-align:center;padding-bottom:16px;font-weight: 500;font-size: 16px;mso-padding-bottom-alt:20px;
   line-height: 24px;letter-spacing: 0.1px;">
   <table role=presentation border=0 cellspacing=0 cellpadding=0 align=center style="premailer-cellpadding:0; -premailer-cellspacing:0;mso-table-lspace:0; mso-table-rspace:0;mso-line-height-rule: exactly;border:0px;text-align:center;">
   <tr>
   
    <td style=border-collapse:collapse; dir=ltr align=center style=direction:ltr;>
   
   <div>
   
    <!--[if gte mso]>
   <td class="link_color" colspan="2" align="center"  style="padding-top:14px;padding-right:0px;padding-bottom:0px;">
   <table role="presentation"><tr><td dir="ltr" align="left"  style="font-weight:500; color:#ffffff; padding: 12px 24px 12px 24px;background-color: #0B57D0;border-radius: 50px;font-weight:500;direction:ltr;">
   <a href="https://notifications.google.com/g/p/ADa0GC9Zql9sAecfQdGXhnYZrCDCnqvosJQ0uEYjz0V10Rq55BoCavEqEml04klcX6IgaHKwD4REJ2QYwQ2tlZvKx36w6B8vz99SSpOF0nv8TbiWyAau5_o4gpdfIwitIe8jl3f6n0SNtpEbgB0K3u5SLofi4oVJdngprrhFUwrdyTcHtrMEnhaEjUXrYEqvt2ChQtxBRU1QQdH-f29iwwc" target="_blank" style="text-decoration:none; color:#ffffff;font-size:14px;line-height:20px">${name}</a>
   </td></tr></table></td>
   <![endif]-->
   <!--[if !mso]><!-->
   
   <a href=https://notifications.google.com/g/p/ADa0GC9Zql9sAecfQdGXhnYZrCDCnqvosJQ0uEYjz0V10Rq55BoCavEqEml04klcX6IgaHKwD4REJ2QYwQ2tlZvKx36w6B8vz99SSpOF0nv8TbiWyAau5_o4gpdfIwitIe8jl3f6n0SNtpEbgB0K3u5SLofi4oVJdngprrhFUwrdyTcHtrMEnhaEjUXrYEqvt2ChQtxBRU1QQdH-f29iwwc class="mobilecta m_cta_newpad" target=_blank style="border-radius:4px;font-size:14px;text-align:center;line-height:20px;font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif;font-weight:500;color:#ffffff;text-decoration:none;border-radius:5px;padding:7px 0px;padding-top:0px !important;display:inline-block;mso-padding-alt: 0px;direction:ltr;font-weight: bold;font-size: 16px;line-height: 24px;letter-spacing: 0.1px;">
     <span style="border-radius:50px;font-size:16px;text-align:center;line-height:24px;font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif;font-weight:500;color:#ffffff;text-decoration:none;border-radius:50px; direction:ltr;padding:11px 20px 12px 20px;border:1px solid #0B57D0;display:inline-block;background-color:#0B57D0;mso-padding-alt: 0px;font-weight: bold;font-size: 16px;line-height: 24px;letter-spacing: 0.1px;"><!--[if mso]><font face="Arial,sans-serif"><![endif]-->${name}</span>
     </a>
     <!--<![endif]--></div>
     </td>
   </tr>
   </table>
   </td>
   </tr>
     
     <!--[if !mso]><!-->
   <tr>
   <td class="cta_mob mob_padding_32" align=center width=690 style="width:690px;text-align:center;padding-bottom:18px;display:none;font-size:16px; line-height:24px;">
   <table role=presentation border=0 cellspacing=0 cellpadding=0 align=center style="premailer-cellpadding:0; -premailer-cellspacing:0;mso-table-lspace:0; mso-table-rspace:0;mso-line-height-rule: exactly;border:0px;text-align:center;">
   <tr>
   
    <td style=border-collapse:collapse; align=center dir=ltr style=direction:ltr;>
   
   <div>
   
     <!--[if mso]>
     <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://notifications.google.com/g/p/ADa0GC9Zql9sAecfQdGXhnYZrCDCnqvosJQ0uEYjz0V10Rq55BoCavEqEml04klcX6IgaHKwD4REJ2QYwQ2tlZvKx36w6B8vz99SSpOF0nv8TbiWyAau5_o4gpdfIwitIe8jl3f6n0SNtpEbgB0K3u5SLofi4oVJdngprrhFUwrdyTcHtrMEnhaEjUXrYEqvt2ChQtxBRU1QQdH-f29iwwc" style="height:;direction:ltr;v-text-anchor:middle;width:px;" arcsize="13%" stroke="f" fillcolor="#1A73E8">
       <w:anchorlock/>
       <center>
     <![endif]-->
   
   <a href=https://notifications.google.com/g/p/ADa0GC9Zql9sAecfQdGXhnYZrCDCnqvosJQ0uEYjz0V10Rq55BoCavEqEml04klcX6IgaHKwD4REJ2QYwQ2tlZvKx36w6B8vz99SSpOF0nv8TbiWyAau5_o4gpdfIwitIe8jl3f6n0SNtpEbgB0K3u5SLofi4oVJdngprrhFUwrdyTcHtrMEnhaEjUXrYEqvt2ChQtxBRU1QQdH-f29iwwc class="mobilecta m_cta_newpad" target=_blank style="border-radius:4px;font-size:14px;text-align:center;line-height:20px;font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:5px;padding:6px 0px;display:inline-block;mso-padding-alt: 0px;direction:ltr;">
     <span style="border-radius:50px;font-size:16px;text-align:center;line-height:24px;font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:50px;padding:12px 24px 12px 24px;border:1px solid #0B57D0;display:inline-block;background-color:#0B57D0;mso-padding-alt: 0px;"><!--[if mso]><font face="Arial,sans-serif"><![endif]-->${name}</span>
     </a>
     <!--[if mso]>
       </center>
     </v:roundrect>
   <![endif]--></div>
     </td>
   </tr>
   </table>
   </td>
   </tr>
      <!--<![endif]-->
   
     <tr>
           <td align=center dir=ltr class=hero_subheadline colspan=1 style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
    color:#3C4043; font-size:14px; font-weight:normal; font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif; line-height:21px; padding-top:0px; padding-bottom:17px;letter-spacing:0.2px;text-align:center;direction:ltr;padding-left:110px;padding-right:110px;">
      
         <!--[if mso]><font face="Arial,sans-serif"><![endif]--> To give feedback, visit our contact page.
       </td>
     </tr>
   
   
     <tr>
           <td align=center dir=ltr class=hero_subheadline colspan=1 style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
    color:#3C4043; font-size:14px; font-weight:normal; font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif; line-height:21px; padding-top:0px; padding-bottom:0px;letter-spacing:0.2px;text-align:center;direction:ltr;padding-top:5px;padding-left:110px;padding-right:110px;">
      
         <!--[if mso]><font face="Arial,sans-serif"><![endif]-->For more information visit our about page.
       </td>
     </tr>   
     </table>
   
   
   <table bgcolor=#ffffff background=https://www.gstatic.com/gumdrop/files/bard-dots-mob-updated-transparent-w720px-h268px-2x.gif role=presentation cellpadding=0 cellspacing=0 border=0 width=100% style="width:100%;background-size:100%; background-repeat: no-repeat; background-position:top;display:none;" class=bg_img_mob>
     <tr>
           <td align=center class="mob_td_width bg_padd" dir=ltr colspan=1 style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
    color:#3C4043; font-size:14px; font-weight:bold; font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif; line-height:21px; padding-bottom:70px;letter-spacing:normal;text-align:center;direction:ltr;">Thank you for using ${name}!</td>
     </tr>
     </table>
   <!--[if gte mso 9]>
   <v:rect xmlns_v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:720px;height:134px; background-color:#ffffff;">
   <v:fill type="frame" src="https://www.gstatic.com/gumdrop/files/bard-dots-static-desk-transparent-w1440px-h268px-2x.png" />
   <v:textbox inset="0,0,0,0">
   <![endif]-->
   <table bgcolor=#ffffff background=https://www.gstatic.com/gumdrop/files/bard-dots-desk-updated-transparent-w1440px-h268px-2x.gif role=presentation cellpadding=0 cellspacing=0 border=0 width=100% style="width:100%;background-size:100%; background-repeat: no-repeat; background-position:bottom;background-color: #ffffff;" class=bg_img_desk>
     
   
   
     <tr>
           <td align=center dir=ltr class=mob_td_width colspan=1 style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
    color:#3C4043; font-size:14px; font-weight:bold; font-family:'Google sans', 'Roboto', Arial, Helvetica, sans-serif; line-height:21px;padding-left:40px; padding-right:40px; padding-top:19px; padding-bottom:84px;letter-spacing:normal;text-align:center;direction:ltr;background: transparent;"><!--[if mso]><font face="Arial,sans-serif"><![endif]-->Thank you for using ${name}!
             </td>
     </tr>
   
     </table>
     <!--[if gte mso 9]>
         </v:textbox>
         </v:rect>
   <![endif]-->
     
   
   
   <table align=center border=0 cellpadding=0 cellspacing=0 role=presentation width=100% class=mob_divider style=width:100%;padding-top:5px;>
    <tr class=mob_hide>
                           <td align=center style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
   ">
       
           <img src=https://www.gstatic.com/gumdrop/files/bard-footer-divider-desk-transparent-w1440px-h16px-2x.png class="" width=720 style=width:720px;>
     </td>
                   </tr>
   
     <tr class=mob_show style=display:none;>
       <td align=center style="   margin-top:0;
      margin-bottom:0;
      margin-right:0;
      margin-left:0;
       padding-top:0;
      padding-bottom:0;
      padding-right:0;
      padding-left:0;
   ">
           <img src=https://www.gstatic.com/gumdrop/files/bard-footer-divider-mob-transparent-w720px-h16px-2x.png class=mob_img width=100% style="">
         
               </td>
             </tr>
       <tr class=mob_show style=display:none;><td height=10 style="font-size:0px;line-height:0px; height:10px;">&nbsp;</td></tr>
     </table>
   
   
   <table role=presentation align=center cellpadding=0 cellspacing=0 style="width:100%; margin:0 auto;padding:0; border:0; border-spacing:0; border-collapse:collapse;" class=table-gray>
     <tbody>
       <tr>
         <td>
           <table role=presentation align=center class="width-100 table-gray" cellpading=0 cellspacing=0 style="width:100%; margin: 0 auto;">
               <tbody>
                 
                 
                
                 <tr>
           <td class=mob_footer dir=ltr style="width:100%; padding-top:35px; padding-bottom:11px; text-align:center;">
             ${name}
           </td>
       </tr>
                 <tr>
                   <td class=mob_footer style="width:100%;table-layout:fixed;font-family: 'Google sans', 'Roboto', Arial, Helvetica, sans-serif;font-size:8px;line-height:12px;font-weight:normal;word-break:break-word;color: #3C4043; padding-left:140px; padding-right:140px; padding-bottom:14px;padding-top:0px;text-align:center;" dir=ltr class=text-gray><!--[if mso]><font face="Arial,sans-serif"><![endif]-->
                     
                      
         <span style="font-size:inherit; color:inherit; font-weight:inherit; line-height:inherit; font-family:inherit;">&copy; 2023 Google LLC<br />1600 Amphitheatre Parkway,<br />Mountain View, CA 94043</span>
      
      
   
                    
                   </td>
                 </tr>
                 <tr>
                   
                   <td class=mob_footer dir=ltr style="width:100%;table-layout:fixed;font-family: 'Google sans', 'Roboto', Arial, Helvetica, sans-serif;font-size:8px;line-height:12px;font-weight:normal; color: #3C4043; padding-left:140px; padding-right:140px;padding-bottom:40px; text-align:center;direction:ltr;" class=text-gray><!--[if mso]><font face="Arial,sans-serif"><![endif]-->This message was sent to you because you are uing ${name}.</td>
                 </tr>
   
               </tbody>
           </table>
         </td>
       </tr>
     </tbody>
   </table>
   
    </td>
     </tr>
     </table>
     </section>
     </center>
     </body>
     </html>
   </html>
   `
}
