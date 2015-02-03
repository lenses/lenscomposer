class Lens
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :final_result, type: Object
  field :linear_data, type: Array
  field :connector_data, type: Object
  field :type

end
