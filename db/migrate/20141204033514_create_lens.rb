class CreateLens < ActiveRecord::Migration
  def change
    create_table :lens do |t|

      t.string :tag

      t.timestamps
    end
  end
end
