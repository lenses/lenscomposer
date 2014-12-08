class AddLensIdToComponents < ActiveRecord::Migration
  def change
    add_column :components, :lens_id, :integer
  end
end
