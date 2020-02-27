class CriptosController < ApplicationController
  before_action :set_cripto, only: [:show, :update, :destroy]

  # GET /criptos
  def index
    @criptos = Cripto.all

    render json: @criptos
  end

  # GET /criptos/1
  def show
    render json: @cripto
  end

  def read
    type = params[:type]
    idr = params[:id].to_i
    name = params[:name]
    key = params[:key]
    print("*********\n")

    print (params)
    if Cripto.where(name: name).count > 0
      idc = Cripto.where(name: name).first.id      
      msg = Message.where(cripto_id: idc).limit(1).offset(idr - 1).first      
      rta = ""
      error = ""
      case type
      when "DES"
        if msg.cipher_type == 0
          word1 = key
          word2 = msg.msg
          outputBinaryFile = "/app/controllers/DESinv_main  "
          commandOutput = `./#{outputBinaryFile} '#{word1}' '#{word2}'`
          rta = commandOutput[12, commandOutput.length]
        else
          error = "Tipo de cifrado inválido"
        end
      when "Criptex"
        if msg.cipher_type == 1
          word2 = key
          word1 = msg.msg
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
        else
          error = "Tipo de cifrado inválido"
        end
      end
      if error.length == 0
        print(rta)
        render json: {rta: rta, status: :descipher}
      else
        render json: error, status: :no_content
      end
    else
      render json: {rta: nil, status: :null}
    end
  end

  # POST /criptos
  def create
    newmsg = ""
    newParams = Hash.new()
    newParams[:name] = cripto_params[:name]
    paramsMsg = Hash.new()
    type = cripto_params[:type]
    @cipher_type;
    case type
    when "DES"
      word1 = cripto_params[:key]
      word2 = cripto_params[:msg]
      outputBinaryFile = "/app/controllers/DES_main"
      commandOutput = `./#{outputBinaryFile} '#{word1}' '#{word2}'`
      newmsg = commandOutput.split("\n")[2].delete(" ").delete("\n")
      @cipher_type = 0
      #@message.msg = newmsg
    when "Criptex"
      word1 = cripto_params[:key]
      word2 = cripto_params[:msg]
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
      @cipher_type = 1
      print(newmsg)
    end

    if Cripto.exists?(:name => newParams[:name])
      @cripto = Cripto.where(name: newParams[:name]).first
    else
      @cripto = Cripto.new(newParams)
      @cripto.save
    end
    idr = @cripto.messages.count + 1
    msg = Message.new(msg: newmsg)
    msg.cripto = @cripto
    msg.idrelative = idr
    msg.cipher_type = @cipher_type

    if msg.save
      render json: {id: msg.idrelative, status: :created}
    else
      render json: msg.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /criptos/1
  def update
    if @cripto.update(cripto_params)
      render json: @cripto
    else
      render json: @cripto.errors, status: :unprocessable_entity
    end
  end

  # DELETE /criptos/1
  def destroy
    @cripto.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_cripto
    @cripto = Cripto.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def cripto_params
    params.require(:cripto).permit(:name, :msg, :key, :type)
  end
end
