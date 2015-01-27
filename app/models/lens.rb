class Lens
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :els, type: Array

end
