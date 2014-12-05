class RenameLensToComponents < ActiveRecord::Migration
  def change
    rename_table :lens, :components
  end
end
