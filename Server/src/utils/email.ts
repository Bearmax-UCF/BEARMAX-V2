

export function accountRegistrationEmailTemplate(recipientName: string, verificationLink: string) :string{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bearmx Email Verification</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
    
        header {
          background-color: #007BFF;
          color: #fff;
          text-align: center;
          padding: 10px;
        }
    
        main {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        footer {
          text-align: center;
          margin-top: 20px;
          padding: 10px;
          background-color: #007BFF;
          color: #fff;
        }
    
        a {
          color: #007BFF;
          text-decoration: none;
        }
    
        h1, h2, h3 {
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>Bearmax Account Services</h1>
        </header>
    
        <main>
          <h2>Bearmax Email Verification</h2>
          <p>Thank you for signing up with Bearmax! To complete your registration, please click the link below to verify your email address:</p>
    
          <p><a href="${verificationLink}" target="_blank">Verify Your Email</a></p>
    
          <p>If the above link doesn't work, you can copy and paste the following URL into your browser:</p>
          <p>${verificationLink}</p>
    
          <p>This link will expire in 24 hours for security reasons.</p>
          
          <p>If you did not sign up for Bearmax, you can ignore this email.</p>
        </main>
      </div>
    </body>
    </html>`;
}

export function resetPasswordEmailTemplate(resetLink: string) :string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
    
        header {
          background-color: #007BFF;
          color: #fff;
          text-align: center;
          padding: 10px;
        }
    
        main {
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        footer {
          text-align: center;
          margin-top: 20px;
          padding: 10px;
          background-color: #007BFF;
          color: #fff;
        }
    
        a {
          color: #007BFF;
          text-decoration: none;
        }
    
        h1, h2, h3 {
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>Bearmax Account Services</h1>
        </header>
    
        <main>
          <h2>Bearmax Account Password Reset</h2>
          <p>We received a request to reset your password. If you did not make this request, you can safely ignore this email.</p>
    
          <p>To reset your password, please click the link below:</p>
          <p><a href="${resetLink}" target="_blank">Reset Your Password</a></p>
    
          <p>If the above link doesn't work, you can copy and paste the following URL into your browser:</p>
          <p>${resetLink}</p>
    
          <p>This link will expire in 1 hour for security reasons.</p>
        </main>
      </div>
    </body>
    </html>
    `;
}

