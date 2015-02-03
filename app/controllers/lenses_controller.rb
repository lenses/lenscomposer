class LensesController < ApplicationController

  def new_test
  end

  def new
  end

  def index
    @lenses = Lens.all.to_a
  end

  def create

    lens_params = [:author, :name, :type, :connector_data, :linear_data, :final_result]
    attrb = select_params(lens_params)

    # linear_data is an array of Objects of Components Properties
    # that needs to be deserialized correctly
    if attrb["linear_data"]
      attrb["linear_data"] = JSON.parse(attrb["linear_data"])
    end
    
    lens = Lens.create(attrb)
    render json: lens.id.to_s.to_json
  end

  def show
    lens = Lens.find(params[:id])
    final_result = lens.final_result
    if final_result
      @final_result_html = lens.generate_html_tag(JSON.parse(final_result))

    else
      render inline: "No final result for this lens"
    end
  end

  def edit
    @lens = Lens.find(params[:id])
    
    if @lens.type == 'linear'
      gon.lens = { 'linear_data'=> @lens.linear_data.to_json, 'author'=> @lens.author, 'title'=> @lens.name, 'type'=> @lens.type}
    elsif @lens.type == 'connector'
      gon.lens = { 'connector_data'=> @lens.connector_data, 'type'=> @lens.type}
    end
    
  end

  # Not currently being used -- instead of updating a lens, a new lens a created
  def update
    @lens = Lens.find(params[:id])
    attrb = select_params(lens_params)
    # linear_data is an array of Objects of Components Properties
    # that needs to be deserialized correctly
    attrb["linear_data"] = JSON.parse(attrb["linear_data"])
    lens = Lens.update(attrb)
    
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
