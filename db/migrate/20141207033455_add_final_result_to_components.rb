class AddFinalResultToComponents < ActiveRecord::Migration
  def change
    add_column :components, :final_result, :boolean
  end
end
