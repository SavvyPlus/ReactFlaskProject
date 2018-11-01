import smtplib


def send_email(target_email):
    original_email = 'testing@savvyplus.com.au'
    server_host = 'email-smtp.us-west-2.amazonaws.com'
    username = "AKIAISTP2VVSMYG7X62A"
    password = "AhDOJ0gw1xam5CCNOuDkK0g0mxrlS6yJB0DNFX6GieRI"

    # Send the mail, Just for testing now, need to construct properly in the future.
    body = "Hello, this is just for testing!"

    msg = ("From: %s\r\nTo: %s\r\n\r\n"
           % (original_email, target_email))

    msg = msg + body

    print(msg)

    server = smtplib.SMTP_SSL(host=server_host, port=465)
    server.set_debuglevel(1)
    server.login(username, password)
    server.sendmail(original_email, target_email, msg)


send_email("zewen.xu@zawee.work")
