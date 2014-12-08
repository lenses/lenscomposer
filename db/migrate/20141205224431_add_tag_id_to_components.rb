class AddTagIdToComponents < ActiveRecord::Migration
  def change
    add_column :components, :tagid, :string
  end
end
