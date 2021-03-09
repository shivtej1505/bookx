class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :google_id
      t.string :title
      t.integer :status
      t.integer :inventory

      t.timestamps
    end
  end
end
