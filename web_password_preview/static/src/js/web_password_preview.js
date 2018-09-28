"use strict";
/**
 * Copyright 2018 Modoolar <info@modoolar.com>
 * License LGPLv3.0 or later (https://www.gnu.org/licenses/lgpl-3.0.en.html).
 *
 */

odoo.define('web_password_preview', function (require) {
    const InputField = require("web.basic_fields").InputField;
    const field_registry = require('web.field_registry');
    const core = require('web.core');
    const _t = core._t;

    InputField.include({
        events: Object.assign({}, InputField.prototype.events, {
            'click .preview': '_onPreviewClick',
        }),
        init() {
            this._super.apply(this, arguments);
            this.nodeOptions.isPreviewable = 'preview' in this.attrs;
        },
        _renderEdit: function () {
            this._super.apply(this, arguments);
            if (this.nodeOptions.isPreviewable || this.nodeOptions.isPassword) {
                this._appendValueTooltip();
            }
        },
        _renderReadonly() {
            this._super.apply(this, arguments);
            if (this.nodeOptions.isPreviewable || this.nodeOptions.isPassword) {
                this._appendValueTooltip();
            }
        },
        _appendValueTooltip(){
            let tooltip = $('<a class="btn btn-default preview" href="#">' +
                    '<i class="fa fa-eye"/></a>');
            this.$el.append(tooltip);
            tooltip.tooltip({
                title: function(){
                    return this.$input ? this.$input.attr("value") : this.value;
                }.bind(this),
                delay: {show: 0, hide: 3000},
                trigger: "manual",
            })
        },
        _onPreviewClick(event) {
            event.preventDefault();
            event.stopPropagation();
            this.$(".preview").tooltip('show');
        }
    });
});
