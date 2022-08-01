export async function getVerifyMail(to, code) {
    const home = 'https://nextjs.org/'
    const verify = 'https://nextjs.org/auth/verify'
    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
    data-editor-version="2"
    class="sg-campaigns"
    xmlns="http://www.w3.org/1999/xhtml"
>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:AllowPNG />
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
            <style type="text/css">
                body {
                    width: 600px;
                    margin: 0 auto;
                }
                table {
                    border-collapse: collapse;
                }
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
                img {
                    -ms-interpolation-mode: bicubic;
                }
            </style>
        <![endif]-->
        <style type="text/css">
            body,
            p,
            div {
                font-family: inherit;
                font-size: 14px;
            }
            body {
                color: #000000;
            }
            body a {
                color: #1188e6;
                text-decoration: none;
            }
            p {
                margin: 0;
                padding: 0;
            }
            table.wrapper {
                width: 100% !important;
                table-layout: fixed;
                -webkit-font-smoothing: antialiased;
                -webkit-text-size-adjust: 100%;
                -moz-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            img.max-width {
                max-width: 100% !important;
            }
            .column.of-2 {
                width: 50%;
            }
            .column.of-3 {
                width: 33.333%;
            }
            .column.of-4 {
                width: 25%;
            }
            @media screen and (max-width: 480px) {
                .preheader .rightColumnContent,
                .footer .rightColumnContent {
                    text-align: left !important;
                }
                .preheader .rightColumnContent div,
                .preheader .rightColumnContent span,
                .footer .rightColumnContent div,
                .footer .rightColumnContent span {
                    text-align: left !important;
                }
                .preheader .rightColumnContent,
                .preheader .leftColumnContent {
                    font-size: 80% !important;
                    padding: 5px 0;
                }
                table.wrapper-mobile {
                    width: 100% !important;
                    table-layout: fixed;
                }
                img.max-width {
                    height: auto !important;
                    max-width: 100% !important;
                }
                a.bulletproof-button {
                    display: block !important;
                    width: auto !important;
                    font-size: 80%;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }
                .columns {
                    width: 100% !important;
                }
                .column {
                    display: block !important;
                    width: 100% !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                }
            }
        </style>
        <!--user entered Head Start-->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
            rel="stylesheet"
        />
        <style>
            body {
                font-family: 'Inter', sans-serif;
            }
        </style>
        <!--End Head user entered-->
    </head>
    <body>
        <center
            class="wrapper"
            data-link-color="#1188E6"
            data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#f3f3f3;"
        >
            <div class="webkit">
                <table
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    width="100%"
                    class="wrapper"
                    bgcolor="#f3f3f3"
                >
                    <tbody>
                        <tr>
                            <td valign="top" bgcolor="#f3f3f3" width="100%">
                                <table
                                    width="100%"
                                    role="content-container"
                                    class="outer"
                                    align="center"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                >
                                    <tbody>
                                        <tr>
                                            <td width="100%">
                                                <table
                                                    width="100%"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    border="0"
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <!--[if mso]>
               <center>
               <table><tr><td width="600">
            <![endif]-->
                                                                <table
                                                                    width="100%"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    border="0"
                                                                    style="
                                                                        width: 100%;
                                                                        max-width: 600px;
                                                                    "
                                                                    align="center"
                                                                >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                role="modules-container"
                                                                                style="
                                                                                    padding: 0px
                                                                                        0px
                                                                                        0px
                                                                                        0px;
                                                                                    color: #000000;
                                                                                    text-align: left;
                                                                                "
                                                                                bgcolor="#FFFFFF"
                                                                                width="100%"
                                                                                align="left"
                                                                            >
                                                                                <table
                                                                                    class="module preheader preheader-hide"
                                                                                    role="module"
                                                                                    data-type="preheader"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        display: none !important;
                                                                                        mso-hide: all;
                                                                                        visibility: hidden;
                                                                                        opacity: 0;
                                                                                        color: transparent;
                                                                                        height: 0;
                                                                                        width: 0;
                                                                                    "
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                role="module-content"
                                                                                            >
                                                                                                <p></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>

                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="text"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1"
                                                                                    data-mc-module-version="2019-10-22"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 50px
                                                                                                        20px
                                                                                                        10px
                                                                                                        20px;
                                                                                                    line-height: 22px;
                                                                                                    text-align: inherit;
                                                                                                "
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                                role="module-content"
                                                                                            >
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: center;
                                                                                                        "
                                                                                                    >
                                                                                                        <h3>
                                                                                                            Next
                                                                                                            Inc.
                                                                                                        </h3>
                                                                                                        <span
                                                                                                            style="
                                                                                                                font-size: 28px;
                                                                                                                font-family: inherit;
                                                                                                            "
                                                                                                            >Order
                                                                                                            Confirmation</span
                                                                                                        >
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="text"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1"
                                                                                    data-mc-module-version="2019-10-22"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 0px
                                                                                                        20px
                                                                                                        10px
                                                                                                        20px;
                                                                                                    line-height: 22px;
                                                                                                    text-align: inherit;
                                                                                                "
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                                role="module-content"
                                                                                            >
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: center;
                                                                                                        "
                                                                                                    >
                                                                                                        <span
                                                                                                            style="
                                                                                                                font-size: 16px;
                                                                                                                font-family: inherit;
                                                                                                            "
                                                                                                            >Order
                                                                                                            Number: </span
                                                                                                        ><span
                                                                                                            style="
                                                                                                                font-size: 16px;
                                                                                                                font-family: inherit;
                                                                                                            "
                                                                                                            ><u
                                                                                                                >TR3D52019</u
                                                                                                            ></span
                                                                                                        >
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="text"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1"
                                                                                    data-mc-module-version="2019-10-22"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 20px
                                                                                                        20px
                                                                                                        10px
                                                                                                        20px;
                                                                                                    line-height: 22px;
                                                                                                    text-align: inherit;
                                                                                                "
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                                role="module-content"
                                                                                            >
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: center;
                                                                                                        "
                                                                                                    >
                                                                                                        Hi
                                                                                                        {(
                                                                                                        first_name
                                                                                                        }},
                                                                                                        thanks
                                                                                                        for
                                                                                                        your
                                                                                                        order!&nbsp;
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: center;
                                                                                                        "
                                                                                                    >
                                                                                                        <br />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: center;
                                                                                                        "
                                                                                                    >
                                                                                                        We’ll
                                                                                                        get
                                                                                                        it
                                                                                                        to
                                                                                                        your
                                                                                                        doorstep
                                                                                                        as
                                                                                                        soon
                                                                                                        as
                                                                                                        possible!
                                                                                                        You'll
                                                                                                        get
                                                                                                        a
                                                                                                        shipping
                                                                                                        notification
                                                                                                        once
                                                                                                        your
                                                                                                        order
                                                                                                        has
                                                                                                        left
                                                                                                        our
                                                                                                        shop
                                                                                                        and
                                                                                                        is
                                                                                                        on
                                                                                                        the
                                                                                                        way
                                                                                                        to
                                                                                                        you!
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="spacer"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="8395333d-62e9-4e61-957d-72d0eefc1a4f"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 0px
                                                                                                        0px
                                                                                                        30px
                                                                                                        0px;
                                                                                                "
                                                                                                role="module-content"
                                                                                                bgcolor=""
                                                                                            ></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="text"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="f612db9d-7563-4153-b3d5-8a0015929def.1"
                                                                                    data-mc-module-version="2019-10-22"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 18px
                                                                                                        30px
                                                                                                        18px
                                                                                                        40px;
                                                                                                    line-height: 22px;
                                                                                                    text-align: inherit;
                                                                                                "
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                                role="module-content"
                                                                                            >
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        <span
                                                                                                            style="
                                                                                                                font-size: 28px;
                                                                                                            "
                                                                                                            >Billing
                                                                                                            Information</span
                                                                                                        >
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="divider"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="86c0feb7-e890-4382-bb8e-b1910742ba10.1.1"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 0px
                                                                                                        30px
                                                                                                        0px
                                                                                                        40px;
                                                                                                "
                                                                                                role="module-content"
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                            >
                                                                                                <table
                                                                                                    border="0"
                                                                                                    cellpadding="0"
                                                                                                    cellspacing="0"
                                                                                                    align="center"
                                                                                                    width="100%"
                                                                                                    height="1px"
                                                                                                    style="
                                                                                                        line-height: 1px;
                                                                                                        font-size: 1px;
                                                                                                    "
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="
                                                                                                                    padding: 0px
                                                                                                                        0px
                                                                                                                        1px
                                                                                                                        0px;
                                                                                                                "
                                                                                                                bgcolor="#000000"
                                                                                                            ></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="text"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1.1.1"
                                                                                    data-mc-module-version="2019-10-22"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 30px
                                                                                                        20px
                                                                                                        30px
                                                                                                        40px;
                                                                                                    line-height: 22px;
                                                                                                    text-align: inherit;
                                                                                                "
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                                role="module-content"
                                                                                            >
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        A
                                                                                                        full
                                                                                                        name
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        1234
                                                                                                        Address
                                                                                                        Road
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        City,
                                                                                                        State
                                                                                                        12345
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        (123)
                                                                                                        456
                                                                                                        -
                                                                                                        7890&nbsp;
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        <br />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        Payment
                                                                                                        Method:
                                                                                                        VISA
                                                                                                        9876
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="text"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="f612db9d-7563-4153-b3d5-8a0015929def.1.1"
                                                                                    data-mc-module-version="2019-10-22"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 18px
                                                                                                        30px
                                                                                                        18px
                                                                                                        40px;
                                                                                                    line-height: 22px;
                                                                                                    text-align: inherit;
                                                                                                "
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                                role="module-content"
                                                                                            >
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        <span
                                                                                                            style="
                                                                                                                font-size: 28px;
                                                                                                            "
                                                                                                            >Order
                                                                                                            Summary</span
                                                                                                        >
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="divider"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="86c0feb7-e890-4382-bb8e-b1910742ba10.1"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 0px
                                                                                                        30px
                                                                                                        0px
                                                                                                        40px;
                                                                                                "
                                                                                                role="module-content"
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                            >
                                                                                                <table
                                                                                                    border="0"
                                                                                                    cellpadding="0"
                                                                                                    cellspacing="0"
                                                                                                    align="center"
                                                                                                    width="100%"
                                                                                                    height="1px"
                                                                                                    style="
                                                                                                        line-height: 1px;
                                                                                                        font-size: 1px;
                                                                                                    "
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                style="
                                                                                                                    padding: 0px
                                                                                                                        0px
                                                                                                                        1px
                                                                                                                        0px;
                                                                                                                "
                                                                                                                bgcolor="#000000"
                                                                                                            ></td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="text"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="ef0f9e06-1b02-4b22-b5e8-dc8f6bb9b3b1.1.1.1.1.1"
                                                                                    data-mc-module-version="2019-10-22"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 30px
                                                                                                        20px
                                                                                                        30px
                                                                                                        40px;
                                                                                                    line-height: 22px;
                                                                                                    text-align: inherit;
                                                                                                "
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                                role="module-content"
                                                                                            >
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        Subtotal:
                                                                                                        $199.70
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        Shipping:
                                                                                                        $10.00
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        Tax:
                                                                                                        $18.70
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        <br />
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: inherit;
                                                                                                        "
                                                                                                    >
                                                                                                        <strong
                                                                                                            >Total:
                                                                                                            $228.40&nbsp;</strong
                                                                                                        >
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="spacer"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="10dfe38b-ab1a-4083-80ca-725cb09e3c1c.1"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 0px
                                                                                                        0px
                                                                                                        30px
                                                                                                        0px;
                                                                                                "
                                                                                                role="module-content"
                                                                                                bgcolor=""
                                                                                            ></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="text"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="f612db9d-7563-4153-b3d5-8a0015929def.1.1.1"
                                                                                    data-mc-module-version="2019-10-22"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 18px
                                                                                                        30px
                                                                                                        18px
                                                                                                        40px;
                                                                                                    line-height: 28px;
                                                                                                    text-align: inherit;
                                                                                                "
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor=""
                                                                                                role="module-content"
                                                                                            >
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="
                                                                                                            font-family: inherit;
                                                                                                            text-align: center;
                                                                                                        "
                                                                                                    >
                                                                                                        <span
                                                                                                            style="
                                                                                                                font-size: 28px;
                                                                                                            "
                                                                                                            >Questions
                                                                                                            About
                                                                                                            Your
                                                                                                            Order?</span
                                                                                                        >
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    class="module"
                                                                                    data-role="module-button"
                                                                                    data-type="button"
                                                                                    role="module"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    width="100%"
                                                                                    data-muid="c588d3be-b94e-451d-b994-c67321eff57f"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                align="center"
                                                                                                bgcolor=""
                                                                                                class="outer-td"
                                                                                                style="
                                                                                                    padding: 0px
                                                                                                        0px
                                                                                                        0px
                                                                                                        0px;
                                                                                                "
                                                                                            >
                                                                                                <table
                                                                                                    border="0"
                                                                                                    cellpadding="0"
                                                                                                    cellspacing="0"
                                                                                                    class="wrapper-mobile"
                                                                                                    style="
                                                                                                        text-align: center;
                                                                                                    "
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                align="center"
                                                                                                                bgcolor="#ebf7ff"
                                                                                                                class="inner-td"
                                                                                                                style="
                                                                                                                    border-radius: 6px;
                                                                                                                    font-size: 16px;
                                                                                                                    text-align: center;
                                                                                                                    background-color: inherit;
                                                                                                                "
                                                                                                            >
                                                                                                                <a
                                                                                                                    href="http://"
                                                                                                                    style="
                                                                                                                        background-color: #ebf7ff;
                                                                                                                        border: 1px
                                                                                                                            solid
                                                                                                                            #ebf7ff;
                                                                                                                        border-color: #ebf7ff;
                                                                                                                        border-radius: 0px;
                                                                                                                        border-width: 1px;
                                                                                                                        color: #000000;
                                                                                                                        display: inline-block;
                                                                                                                        font-size: 14px;
                                                                                                                        font-weight: bold;
                                                                                                                        letter-spacing: 0px;
                                                                                                                        line-height: normal;
                                                                                                                        padding: 12px
                                                                                                                            18px
                                                                                                                            12px
                                                                                                                            18px;
                                                                                                                        text-align: center;
                                                                                                                        text-decoration: none;
                                                                                                                        border-style: solid;
                                                                                                                        width: 210px;
                                                                                                                        font-family: inherit;
                                                                                                                    "
                                                                                                                    target="_blank"
                                                                                                                    >Contact
                                                                                                                    Us</a
                                                                                                                >
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="spacer"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    width="100%"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    data-muid="0a0f7040-0a2f-4749-8f52-03f4bfb4f161"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                style="
                                                                                                    padding: 0px
                                                                                                        0px
                                                                                                        30px
                                                                                                        0px;
                                                                                                "
                                                                                                role="module-content"
                                                                                                bgcolor=""
                                                                                            ></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <div
                                                                                    data-role="module-unsubscribe"
                                                                                    class="module"
                                                                                    role="module"
                                                                                    data-type="unsubscribe"
                                                                                    style="
                                                                                        color: #444444;
                                                                                        font-size: 12px;
                                                                                        line-height: 20px;
                                                                                        padding: 16px
                                                                                            16px
                                                                                            16px
                                                                                            16px;
                                                                                        text-align: Center;
                                                                                    "
                                                                                    data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
                                                                                >
                                                                                    <div
                                                                                        class="Unsubscribe--addressLine"
                                                                                    >
                                                                                        <p
                                                                                            class="Unsubscribe--senderName"
                                                                                            style="
                                                                                                font-size: 12px;
                                                                                                line-height: 20px;
                                                                                            "
                                                                                        >
                                                                                            {{Sender_Name}}
                                                                                        </p>
                                                                                        <p
                                                                                            style="
                                                                                                font-size: 12px;
                                                                                                line-height: 20px;
                                                                                            "
                                                                                        >
                                                                                            <span
                                                                                                class="Unsubscribe--senderAddress"
                                                                                                >{{Sender_Address}}</span
                                                                                            >,
                                                                                            <span
                                                                                                class="Unsubscribe--senderCity"
                                                                                                >{{Sender_City}}</span
                                                                                            >,
                                                                                            <span
                                                                                                class="Unsubscribe--senderState"
                                                                                                >{{Sender_State}}</span
                                                                                            >
                                                                                            <span
                                                                                                class="Unsubscribe--senderZip"
                                                                                                >{{Sender_Zip}}</span
                                                                                            >
                                                                                        </p>
                                                                                    </div>
                                                                                    <p
                                                                                        style="
                                                                                            font-size: 12px;
                                                                                            line-height: 20px;
                                                                                        "
                                                                                    >
                                                                                        <a
                                                                                            class="Unsubscribe--unsubscribeLink"
                                                                                            href="{{{unsubscribe}}}"
                                                                                            target="_blank"
                                                                                            style=""
                                                                                            >Unsubscribe</a
                                                                                        >
                                                                                        -
                                                                                        <a
                                                                                            href="{{{unsubscribe_preferences}}}"
                                                                                            target="_blank"
                                                                                            class="Unsubscribe--unsubscribePreferences"
                                                                                            style=""
                                                                                            >Unsubscribe
                                                                                            Preferences</a
                                                                                        >
                                                                                    </p>
                                                                                </div>
                                                                                <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    class="module"
                                                                                    data-role="module-button"
                                                                                    data-type="button"
                                                                                    role="module"
                                                                                    style="
                                                                                        table-layout: fixed;
                                                                                    "
                                                                                    width="100%"
                                                                                    data-muid="de63a5a7-03eb-460a-97c7-d2535151ca0b"
                                                                                >
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td
                                                                                                align="center"
                                                                                                bgcolor=""
                                                                                                class="outer-td"
                                                                                                style="
                                                                                                    padding: 0px
                                                                                                        0px
                                                                                                        20px
                                                                                                        0px;
                                                                                                "
                                                                                            >
                                                                                                <table
                                                                                                    border="0"
                                                                                                    cellpadding="0"
                                                                                                    cellspacing="0"
                                                                                                    class="wrapper-mobile"
                                                                                                    style="
                                                                                                        text-align: center;
                                                                                                    "
                                                                                                >
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td
                                                                                                                align="center"
                                                                                                                bgcolor="#f5f8fd"
                                                                                                                class="inner-td"
                                                                                                                style="
                                                                                                                    border-radius: 6px;
                                                                                                                    font-size: 16px;
                                                                                                                    text-align: center;
                                                                                                                    background-color: inherit;
                                                                                                                "
                                                                                                            >
                                                                                                                <a
                                                                                                                    href="https://sendgrid.com/"
                                                                                                                    style="
                                                                                                                        background-color: #f5f8fd;
                                                                                                                        border: 1px
                                                                                                                            solid
                                                                                                                            #f5f8fd;
                                                                                                                        border-color: #f5f8fd;
                                                                                                                        border-radius: 25px;
                                                                                                                        border-width: 1px;
                                                                                                                        color: #a8b9d5;
                                                                                                                        display: inline-block;
                                                                                                                        font-size: 10px;
                                                                                                                        font-weight: normal;
                                                                                                                        letter-spacing: 0px;
                                                                                                                        line-height: normal;
                                                                                                                        padding: 5px
                                                                                                                            18px
                                                                                                                            5px
                                                                                                                            18px;
                                                                                                                        text-align: center;
                                                                                                                        text-decoration: none;
                                                                                                                        border-style: solid;
                                                                                                                        font-family: helvetica,
                                                                                                                            sans-serif;
                                                                                                                    "
                                                                                                                    target="_blank"
                                                                                                                    >♥
                                                                                                                    POWERED
                                                                                                                    BY
                                                                                                                    TWILIO
                                                                                                                    SENDGRID</a
                                                                                                                >
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </center>
    </body>
</html>
`

    return {
        subject: `Verify your Email ${to}`,
        text: `Verify your Email ${to}`,
        html,
    }
}
