class RenameTagidToClasslist < ActiveRecord::Migration
  def change
    rename_column :components, :tagid, :classlist
  end
end
