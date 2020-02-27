class CreateChanels < ActiveRecord::Migration[5.2]
  def change
    create_table :chanels do |t|
      t.string :name
      t.string :emailc
      t.string :emaild

      t.timestamps
    end
  end
end
