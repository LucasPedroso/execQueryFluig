<#import "/wcm.ftl" as wcm />

<#-- Variaveis globais para os layouts -->
<#import "/layout-globals.ftl" as globals />

<!-- layout ECM-DEFAULT-DASHBOARD -->

<#if pageRender.isPreviewMode() = true>
	<@wcm.previewPageAlert />
	<@wcm.deviceTogglePreview />
</#if>

<div class="wcm-wrapper-content ${wcmLayoutEditClass!""} ${pageAuthTypeClass!""}">

	<#if pageRender.isEditMode() != true>
		<@wcm.header />
		<@wcm.menu />
	</#if>

    <div class="wcm-all-content">

        <div id="wcm-content" class="clearfix wcm-background">

			<#if pageRender.isEditMode() = true>
				<@wcm.editHeader />
				<@wcm.widgetsList />
			</#if>

			<div id="${divMasterId!""}" class="clearfix">
				<div id="divSlot1" class="editable-slot slotfull layout-1-1">
					<@wcm.renderSlot id="SlotB" editableSlot="true" isResponsiveSlot="true" />
				</div>
				
			</div>
		</div>
	</div>
</div>