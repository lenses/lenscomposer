class Lens < ActiveRecord::Base
  has_many :components
  accepts_nested_attributes_for :components

end
