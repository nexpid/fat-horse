/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import horse from "file://horse.js";

const settings = definePluginSettings({
    speed: {
        description: "Speed of the fatass horse",
        type: OptionType.NUMBER,
        default: 10,
        isValid: (value: number) => value > 0 || "Speed must be bigger than 0",
        onChange: load
    },
    fps: {
        description: "Framerate of the fatass horse",
        type: OptionType.NUMBER,
        default: 24,
        isValid: (value: number) => value > 0 || "Framerate must be bigger than 0",
        onChange: load
    },
    size: {
        description: "Size of the fatass horse",
        type: OptionType.NUMBER,
        default: 120,
        isValid: (value: number) => value > 0 || "Size must be bigger than 0",
        onChange: load
    },
    fade: {
        description: "If the horse should fade when the cursor is near",
        type: OptionType.BOOLEAN,
        default: true,
        onChange: load
    },
    freeroam: {
        description: "If the horse should roam freely when idle",
        type: OptionType.BOOLEAN,
        default: true,
        onChange: load
    },
    shake: {
        description: "If the horse should shake the window when it's walking",
        type: OptionType.BOOLEAN,
        default: false,
        onChange: load
    }
});

function unload() {
    document.getElementById("fathorse")?.remove()
}

function load() {
    if (!Vencord.Plugins.isPluginEnabled("FatassHorse")) return;
    unload();

    (0, eval)(horse)({
        speed: settings.store.speed,
        fps: settings.store.fps,
        size: settings.store.size,
        fade: settings.store.fade,
        freeroam: settings.store.freeroam,
        shake: settings.store.shake
    });
}

export default definePlugin({
    name: "FatassHorse",
    description: "What a fatass",
    authors: [{
        name: "Nexpid",
        id: 853550207039832084n
    }],
    settings,

    start: load,
    stop: unload,
});
