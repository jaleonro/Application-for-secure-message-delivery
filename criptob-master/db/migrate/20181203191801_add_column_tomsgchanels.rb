class AddColumnTomsgchanels < ActiveRecord::Migration[5.2]
  def change
    add_column :msgchanels, :idrelative, :integer 
  end
end
