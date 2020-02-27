require "RSA.rb"

class ChanelsController < ApplicationController
  def index
    chanels = Chanel.all.order(created_at: :ascd)
    render json: chanels, status: :created, location: @message
  end

  def create
    nde = keysGenerator
    n = nde[0]
    d = nde[1]
    e = nde[2]

    chanel = Chanel.new(name: chanel_params[:name])
    if chanel.save
      ChanelMailer.with(email_a: chanel_params[:email_a], n_generate: n, k_generate: d, name: chanel_params[:name], type: "d", email_to: chanel_params[:email_b]).send_key.deliver_now
      ChanelMailer.with(email_a: chanel_params[:email_b], n_generate: n, k_generate: e, name: chanel_params[:name], type: "e" , email_to: chanel_params[:email_a]).send_key.deliver_now
      render json: chanel.id, status: :created, location: chanel
    else
      render json: chanel.errors, status: :im_used
    end
  end

  def search
    search = params[:chanel][:busqueda]
    print(search)
    chanel = Chanel.where("name like ?", "%#{search}%")

    print(params)
    render json: chanel, status: :ok
  end

  def chanel_params
    params.require(:chanel).permit(:name, :email_a, :email_b)
  end
end
