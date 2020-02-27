class ChanelMailer < ApplicationMailer
    def send_key
        @email = params[:email_a]
        @name = params[:name]
        @n_generate = params[:n_generate]
        @k_generate = params[:k_generate]
        @chanel_name = params[:name]
        @type = params[:type]
        @text = ""
        @text2 = ""
        @email_to = params[:email_to]
        if @type == "d"
            subject = "Canal creado!"
            @text = "El canal que has creado se llama:"
            @text2 = "Se lo ha compartido a: "
        else
            @text = "El canal que te han compartido se llama:"
            subject = "Te han compartido un canal!"
            @text2 = "Te ha compartido: "
        end
        @url  = 'http://example.com/login'
        
        mail(to: @email, subject: subject)
      end
end
