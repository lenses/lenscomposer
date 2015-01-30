class LensesController < ApplicationController

  def new_test
  end

  def new
  end

  def index
    @lenses = Lens.all.to_a
  end

  def create

    lens_params = [:author, :name, :els, :final_result]
    attrb = select_params(lens_params)
    # Els is an array of Objects of Components Properties
    # that needs to be deserialized correctly
    attrb["els"] = JSON.parse(attrb["els"])
    lens = Lens.create(attrb)
    render json: lens.id.to_s.to_json
  end

  def show
    lens = Lens.find(params[:id])
    final_result = lens.final_result
    if final_result
      @final_result_html = lens.generate_html_tag(JSON.parse(final_result))
    # th-connector specific: 
    # idx = lens.els.find_index { |e| e["final_result"]}
    # if idx
    #   final_result = Component.new(lens.els[idx])
    #   @final_result_html = final_result.generate_html_tag
    else
      render inline: "No final result for this lens"
    end
  end

  def edit
    @lens = Lens.find(params[:id])
    @els = @lens.els.to_json
  end

  def update
    @lens = Lens.find(params[:id])
    attrb = select_params(lens_params)
    # Els is an array of Objects of Components Properties
    # that needs to be deserialized correctly
    attrb["els"] = JSON.parse(attrb["els"])
    lens = Lens.update(attrb)
    # current_component_ids = lens_params["components_attributes"].map {|key, value| value["id"]}
    # @lens.components = @lens.components.select {|obj| current_component_ids.include?(obj.id.to_s) }
    # @lens.update(lens_params)
    # render inline: "<%= @lens.id %>"
  end

  def destroy
    lens = Lens.find(params[:id])
    lens.remove()
     respond_to do |format|
      format.js
      format.html { redirect_to lenses_url }
      format.json { head :no_content }
    end
  end

  private

  def select_params(sel_params)
    params.select { |v| sel_params.include?(v.to_sym)}
  end

end
