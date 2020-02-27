class AddColumnToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :idrelative, :integer
  end
end
