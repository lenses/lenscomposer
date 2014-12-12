class ChangeDatatypeOfCurrentstate < ActiveRecord::Migration
  def up
    change_column :components, :currentstate, :text
  end

  def down
    change_column :components, :currentstate, :string
  end
end
