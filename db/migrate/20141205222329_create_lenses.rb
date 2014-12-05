class CreateLenses < ActiveRecord::Migration
  def change
    create_table :lenses do |t|

      t.timestamps
    end
  end
end
