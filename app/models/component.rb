class Component
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  def generate_html_tag
    attrs = generate_html_attrs
    html_tag = "<#{tagname} #{attrs} class='#{classlist}' data-component-id='#{id}'></#{tagname}>"
    return html_tag
  end

  def generate_html_attrs
    attrs = ""

    if self.currentstate.length > 0
      self.currentstate.each do |attr, value|
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
