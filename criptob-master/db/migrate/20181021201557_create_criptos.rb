class CreateCriptos < ActiveRecord::Migration[5.2]
  def change
    create_table :criptos do |t|
      t.string :name

      t.timestamps
    end
    add_index :criptos, :name
  end
end
