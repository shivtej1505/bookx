class Book < ApplicationRecord
  enum status: [ :in_stock, :out_of_stock ]
  before_save :update_status_on_inventory_change
  # TODO: Add validation so that inventory doesn't go below 0

  def update_status_on_inventory_change
    if self.inventory_changed?
      if self.inventory.zero?
        self.status = :out_of_stock
      else
        self.status = :in_stock
      end
    end
  end
end
