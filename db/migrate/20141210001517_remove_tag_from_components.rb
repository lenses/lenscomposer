class RemoveTagFromComponents < ActiveRecord::Migration
  def change
    remove_column :components, :tag, :string
  end
end
