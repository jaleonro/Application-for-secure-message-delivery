require "RSA.rb"

class MsgchanelsController < ApplicationController
  def create
    newmsg = ""
    @type = params[:msgchanel][:type]
    @key = params[:msgchanel][:key]
    @msg = params[:msgchanel][:msg]
    @n_key = params[:msgchanel][:n_key]
    @d_key = params[:msgchanel][:d_key]
    @cipher_type;
    # print(@d_key)
    # print("***********\nbytes:")
    # print(@msg.bytes)
    # print("***********\n")
    
    case @type
    when "DES"
      @cipher_type = 0
      word1 = @key
      word2 = @msg
      outputBinaryFile = "/app/controllers/DES_main"
      commandOutput = `./#{outputBinaryFile} '#{word1}' '#{word2}'`
      newmsg = commandOutput.split("\n")[2].delete(" ").delete("\n")      
      #@message.msg = newmsg
    when "Criptex"
      @cipher_type = 1
      word1 = @key
      word2 = @msg
      outputBinaryFile = "./app/controllers/ownCipher.py"
      File.open("msg.out", "w") { |file|
        file.write(word2 + "---" + word1)
      }

      system("python3 " + outputBinaryFile + " > cryptex.out")
      newmsg = ""

      commandOutput = File.open("cryptex.out", "r")
      commandOutput.each_line do |line|
        newmsg += line
      end
      commandOutput.close      
    end
    contentMsg = Msgchanel.new()
    contentMsg.content = newmsg
    contentMsg.cipher_type = @cipher_type
    contentMsg.signature = signatureGenerator(@msg, @n_key.to_i, @d_key.to_i, 0)
    chanel = Chanel.find(params[:chanel_id])
    idr = chanel.msgchanels.count + 1
    chanel.msgchanels << contentMsg
    contentMsg.idrelative = idr
    if contentMsg.save      
      render json: {id: contentMsg.idrelative, status: :created}
    else
      render json: contentMsg.errors, status: :unprocessable_entity
    end
  end

  def read
    @key = params[:msgchanel][:key]
    @type = params[:msgchanel][:type]
    @id = params[:msgchanel][:id].to_i
    @id_chanel = params[:msgchanel][:id_chanel]
    @n_key = params[:msgchanel][:n_key]
    @e_key = params[:msgchanel][:e_key]

    @chanel = Chanel.find(@id_chanel)
    @msgch = Msgchanel.where(chanel_id: @id_chanel).limit(1).offset(@id.to_i - 1).first
    rta = ""
    error = "";    
    case @type
    when "DES"
      if @msgch.cipher_type == 0
        word1 = @key
        word2 = @msgch.content
        outputBinaryFile = "/app/controllers/DESinv_main  "
        commandOutput = `./#{outputBinaryFile} '#{word1}' '#{word2}'`
        rta = commandOutput[12, commandOutput.length]      
      else
        error = "tipo de cifrado no compatible" 
      end      
    when "Criptex"
      if @msgch.cipher_type == 1
        word2 = @key
        word1 = @msgch.content
        File.open("keymsg.out", "w") { |file| file.write(word1 + "---" + word2) }
        outputBinaryFile = "./app/controllers/ownDescipher.py"
        system ("python3 " + outputBinaryFile + " > scryptexD.out")
        
        str = ""
        commandOutput = File.open("scryptexD.out", "r")
        commandOutput.each_line do |line|
          str += line
        end
        commandOutput.close
        rta = str
        rta = rta.delete("#")
      else
        error = "tipo de cifrado no compatible"    
      end
    end
    
    if error.length == 0
      y = @msgch.signature
      x = rta.delete("\n")
      
      #[98, 117, 101, 110, 97, 115, 32, 110, 111, 99, 104, 101, 115]
      n = @n_key
      d = "0"
      e = @e_key    
      sign = y.delete("[").delete("]").split(",").map{|chr| chr.to_i}
      
      h = signatureVerificator(x, sign, n.to_i, d, e.to_i)
      #print(h)
      if signatureVerificator(x, sign, n.to_i, d, e.to_i)      
        render json:  rta, status: :accepted #200
      else      
        render json:  rta, status: :non_authoritative_information #203
      end
    else
      render json: error, status: :no_content
    end
  end
end
