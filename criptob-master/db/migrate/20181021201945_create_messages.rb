class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :msg
      t.references :cripto, foreign_key: true

      t.timestamps
    end
  end
end
