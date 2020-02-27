class RemoveColumnToChanel < ActiveRecord::Migration[5.2]
  def change
    remove_column :chanels , :emailc
    remove_column :chanels , :emaild
  end
end
