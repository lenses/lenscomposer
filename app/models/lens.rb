class Lens
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :final_result, type: Object
  field :linear_data, type: Array
  field :connector_data, type: Object
  field :type

  def generate_html_tag(element_obj)
    # element_obj contains two keys: componentState(json string of attrs/values) and componentName(string)
    current_state = JSON.parse(element_obj["componentState"])
    attrs = generate_html_attrs(current_state)
    tag_name = element_obj['componentName']
    html_tag = "<#{tag_name} #{attrs}></#{tag_name}>"
    return html_tag
  end

  def generate_html_attrs(attrs_obj)
    attrs = ""
    if attrs_obj
      attrs_obj.each do |attr, value|
          if value.kind_of?(Array)
            attrs << "#{attr}= '#{value.to_json}' "
          else
            attrs << "#{attr}= \"#{value}\" "
          end
      end
    end
    return attrs
  end
end
