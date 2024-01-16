'use strict'

import mjml from 'mjml'


/**
 * Welcome email
 * @param {Object} data Data to be applied to template
 * @returns HTML equivalent of the Mail Jet Markup Language template
 */
export default function (data) {
  const subject = `Welcome`
  const template = `
    <mjml>
      <mj-head>
        <mj-title>${subject}</mj-title>
      </mj-head>
      <mj-body>
        <mj-section>
          <mj-column>

            <mj-text font-size="18px" font-family="helvetica" align="center" padding-bottom="0px">
              <strong>Hi ${data.firstName}!</strong>
            </mj-text>
            <br/>
            <br/>
            <mj-text font-size="16px" font-family="helvetica" align="center" padding-bottom="0px">
              WELCOME TO
            </mj-text>
            <br/>
            <mj-text font-size="30px" font-family="helvetica" align="center" color="#508A48" padding-top="0px">
              Vue3 Vite Exam + TypeScript + Express + Mongoose + MongoDB!
            </mj-text>
            <mj-text align="center" font-size="14px" font-family="helvetica" line-height="16px">
              <p>Please verify your account using the 6-digit One-Time Password (OTP) below
                <br/>
                If you are not the one who requested it, please ignore it.
              </p>
              <strong style="font-size:24px">${data.otp}</strong></strong>.
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `

  return { subject, html: mjml(template).html }
}
