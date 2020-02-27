# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_10_021008) do

  create_table "chanels", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "criptos", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_criptos_on_name"
  end

  create_table "messages", force: :cascade do |t|
    t.text "msg"
    t.integer "cripto_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "idrelative"
    t.integer "cipher_type"
    t.index ["cripto_id"], name: "index_messages_on_cripto_id"
  end

  create_table "msgchanels", force: :cascade do |t|
    t.string "signature"
    t.text "content"
    t.integer "chanel_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "idrelative"
    t.integer "cipher_type"
    t.index ["chanel_id"], name: "index_msgchanels_on_chanel_id"
  end

end
