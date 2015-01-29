class Lens
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :els, type: Array
  field :final_result, type: Object

  def generate_html_tag(element_obj)
    current_state = JSON.parse(element_obj["componentState"])
    attrs = generate_html_attrs(current_state)
    tag_name = element_obj['componentName']
    html_tag = "<#{tag_name} #{attrs}></#{tag_name}>"
    return html_tag
  end

  def generate_html_attrs(attrs_obj)
    attrs = ""
    debugger
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
