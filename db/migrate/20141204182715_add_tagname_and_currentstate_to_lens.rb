class AddTagnameAndCurrentstateToLens < ActiveRecord::Migration
  def change
    add_column :lens, :tagname, :string
    add_column :lens, :currentstate, :string
  end
end
