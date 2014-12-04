class Lens < ActiveRecord::Base

  def generate_html_tag
    attrs = generate_html_attrs
    html_tag = "<#{tagname} #{attrs}></#{tagname}>"
    return html_tag
  end

  def generate_html_attrs
    attrs = ""
    JSON.parse(self.currentstate).each do |attr, value|
        if value.kind_of?(Array)
          attrs << "#{attr}= '#{value.to_json}' "
        else
          attrs << "#{attr}= \"#{value}\" "
        end
    end
    return attrs
  end

end
