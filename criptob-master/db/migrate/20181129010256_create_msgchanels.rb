class CreateMsgchanels < ActiveRecord::Migration[5.2]
  def change
    create_table :msgchanels do |t|
      t.string :signature
      t.text :content
      t.references :chanel, foreign_key: true

      t.timestamps
    end
  end
end
