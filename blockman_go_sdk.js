const BlockmanGoSDK = (() => {
    // 检查当前平台
    const isAndroid = () => !!(window.H5GameInterface && window.H5GameInterface.BMGLogin);
    const isIOS = () => !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.BMGLogin);

    // 通用的验证函数
    const isValidString = (value) => typeof value === 'string' && value.trim() !== '';
    const isValidNumber = (value) => typeof value === 'number' && !isNaN(value);

    // 验证函数，用于统一检查参数
    const validateParams = (params) => {
        for (const param of params) {
            if (!param.value || (param.type === 'string' && !isValidString(param.value)) || (param.type === 'number' && !isValidNumber(param.value))) {
                console.error(`Invalid ${param.name}. It must be a valid ${param.type}.`);
                return false;
            }
        }
        return true;
    };

    // 登录接口
    const BMGLogin = (partnerId) => {
        if (!validateParams([{ name: 'partnerId', value: partnerId, type: 'string' }])) {
            return;
        }

        if (isAndroid()) {
            try {
                window.H5GameInterface.BMGLogin(partnerId);
                console.log(`BMGLogin called successfully on Android with partnerId: ${partnerId}`);
            } catch (error) {
                console.error(`BMGLogin failed on Android: ${error.message}`, error);
            }
        } else if (isIOS()) {
            try {
                window.webkit.messageHandlers.BMGLogin.postMessage(partnerId);
                console.log(`BMGLogin called successfully on iOS with partnerId: ${partnerId}`);
            } catch (error) {
                console.error(`BMGLogin failed on iOS: ${error.message}`, error);
            }
        } else {
            console.error('BMGLogin is not supported on this platform.');
        }
    };

    const Buy = (goodsId, goodsName, goodsPrice, amount, openId, partnerId, extrasParams) => {
        if (!validateParams([
            { name: 'goodsId', value: goodsId, type: 'string' },
            { name: 'goodsName', value: goodsName, type: 'string' },
            { name: 'openId', value: openId, type: 'string' },
            { name: 'partnerId', value: partnerId, type: 'string' },
            { name: 'goodsPrice', value: goodsPrice, type: 'number' },
            { name: 'amount', value: amount, type: 'number' }
        ])) {
            return;
        }

        if (isAndroid()) {
            try {
                window.H5GameInterface.Buy(goodsId, goodsName, goodsPrice, amount, openId, partnerId, extrasParams);
                console.log(`Buy called successfully on Android with goodsId: ${goodsId}`);
            } catch (error) {
                console.error(`Buy failed on Android: ${error.message}`, error);
            }
        } else if (isIOS()) {
            try {
                window.webkit.messageHandlers.Buy.postMessage({ goodsId, goodsName, goodsPrice, amount, openId, partnerId, extrasParams });
                console.log(`Buy called successfully on iOS with goodsId: ${goodsId}`);
            } catch (error) {
                console.error(`Buy failed on iOS: ${error.message}`, error);
            }
        } else {
            console.error('Buy is not supported on this platform.');
        }
    };

    const ShowAd = () => {
        if (isAndroid()) {
            try {
                window.H5GameInterface.ShowAd();
                console.log(`ShowAd called successfully on Android`);
            } catch (error) {
                console.error(`ShowAd failed on Android: ${error.message}`, error);
            }
        } else if (isIOS()) {
            try {
                window.webkit.messageHandlers.ShowAd.postMessage({});
                console.log(`ShowAd called successfully on iOS`);
            } catch (error) {
                console.error(`ShowAd failed on iOS: ${error.message}`, error);
            }
        } else {
            console.error('ShowAd is not supported on this platform.');
        }
    };

    const ExitGame = () => {
        if (isAndroid()) {
            try {
                window.H5GameInterface.ExitGame();
                console.log(`ExitGame called successfully on Android`);
            } catch (error) {
                console.error(`ExitGame failed on Android: ${error.message}`, error);
            }
        } else if (isIOS()) {
            try {
                window.webkit.messageHandlers.ExitGame.postMessage({});
                console.log(`ExitGame called successfully on iOS`);
            } catch (error) {
                console.error(`ExitGame failed on IOS: ${error.message}`, error);
            }
        } else {
            console.error('ExitGame is not supported on this platform.');
        }
    };

    const GetLanguage = () => {
            if (isAndroid()) {
                try {
                    window.H5GameInterface.GetLanguage();
                    console.log(`GetLanguage called successfully on Android`);
                } catch (error) {
                    console.error(`GetLanguage failed on Android: ${error.message}`, error);
                }
            } else if (isIOS()) {
                try {
                    window.webkit.messageHandlers.GetLanguage.postMessage({});
                    console.log(`GetLanguage called successfully on iOS`);
                } catch (error) {
                    console.error(`GetLanguage failed on IOS: ${error.message}`, error);
                }
            } else {
                console.error('GetLanguage is not supported on this platform.');
            }
        };

    const GetUserCustomProps = (apiVersion) => {
                if (isAndroid()) {
                    try {
                        window.H5GameInterface.GetUserCustomProps(apiVersion);
                        console.log(`GetUserCustomProps called successfully on Android`);
                    } catch (error) {
                        console.error(`GetUserCustomProps failed on Android: ${error.message}`, error);
                    }
                } else if (isIOS()) {
                    try {
                        window.webkit.messageHandlers.GetUserCustomProps.postMessage({apiVersion});
                        console.log(`GetUserCustomProps called successfully on iOS`);
                    } catch (error) {
                        console.error(`GetUserCustomProps failed on IOS: ${error.message}`, error);
                    }
                } else {
                    console.error('GetUserCustomProps is not supported on this platform.');
                }
            };

    const PutUserCustomProps = (apiVersion, data) => {
                    if (isAndroid()) {
                        try {
                            window.H5GameInterface.PutUserCustomProps(apiVersion, data);
                            console.log(`PutUserCustomProps called successfully on Android`);
                        } catch (error) {
                            console.error(`PutUserCustomProps failed on Android: ${error.message}`, error);
                        }
                    } else if (isIOS()) {
                        try {
                            window.webkit.messageHandlers.PutUserCustomProps.postMessage({apiVersion, data});
                            console.log(`PutUserCustomProps called successfully on iOS`);
                        } catch (error) {
                            console.error(`PutUserCustomProps failed on IOS: ${error.message}`, error);
                        }
                    } else {
                        console.error('PutUserCustomProps is not supported on this platform.');
                    }
                };

    const ConsumeItemUsing = (apiVersion, orderId, productionId, quantity) => {
                    if (isAndroid()) {
                        try {
                            window.H5GameInterface.ConsumeItemUsing(apiVersion, orderId, productionId, quantity);
                            console.log(`ConsumeItemUsing called successfully on Android`);
                        } catch (error) {
                            console.error(`ConsumeItemUsing failed on Android: ${error.message}`, error);
                        }
                    } else if (isIOS()) {
                        try {
                            window.webkit.messageHandlers.ConsumeItemUsing.postMessage({apiVersion, orderId, productionId, quantity});
                            console.log(`ConsumeItemUsing called successfully on iOS`);
                        } catch (error) {
                            console.error(`ConsumeItemUsing failed on IOS: ${error.message}`, error);
                        }
                    } else {
                        console.error('ConsumeItemUsing is not supported on this platform.');
                    }
                };

    const PurchaseItemUsing = (apiVersion, orderId, productionId, quantity) => {
                    if (isAndroid()) {
                        try {
                            window.H5GameInterface.PurchaseItemUsing(apiVersion, orderId, productionId, quantity);
                            console.log(`PurchaseItemUsing called successfully on Android ${quantity}`);
                        } catch (error) {
                            console.error(`PurchaseItemUsing failed on Android: ${error.message}`, error);
                        }
                    } else if (isIOS()) {
                        try {
                            window.webkit.messageHandlers.PurchaseItemUsing.postMessage({apiVersion, orderId, productionId, quantity});
                            console.log(`PurchaseItemUsing called successfully on iOS`);
                        } catch (error) {
                            console.error(`PurchaseItemUsing failed on IOS: ${error.message}`, error);
                        }
                    } else {
                        console.error('PurchaseItemUsing is not supported on this platform.');
                    }
                };

    // 导出公共 API
    return {
        BMGLogin,
        Buy,
        ShowAd,
        ExitGame,
        GetLanguage,
        GetUserCustomProps,
        PutUserCustomProps,
        ConsumeItemUsing,
        PurchaseItemUsing,
    };
})();

// CommonJS 模块支持
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlockmanGoSDK;
}

// 浏览器环境直接挂载到全局对象
if (typeof window !== 'undefined') {
    window.BlockmanGoSDK = BlockmanGoSDK;
}
