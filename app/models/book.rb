class Book < ApplicationRecord
  enum status: [ :in_stock, :out_of_stock ]
  # TODO: Validations
  # TODO: Unique constraint on google_id
end
