const cheerio = require("cheerio");
const puppeteerExtra = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const imageFinderFunction = async (html, parsedURL, shortenedURL, baseURL) => {
  let mainImage;
  const $ = cheerio.load(html);

  const cheerioImages = $("img");

  const cheerioHREF = $("a");
  let cheerioHREFArr = [];
  cheerioHREF.each((index, item) =>
    cheerioHREFArr.push(item.attribs.href ? item.attribs.href : null)
  );

  cheerioHREFArr = cheerioHREFArr.filter((x) =>
    /(w*(png)|(jpg)|(jpeg)|(ashx)w*)/.test(x)
  );

  const amazonCheerioImages = $("span > span > img");
  const amazonMainImageArr = [];
  amazonCheerioImages.each((index, item) =>
    amazonMainImageArr.push(item.attribs.src)
  );
  const cheerioDivs = $("div");
  const cheerioSources = $("source");
  const cheerioSourceArr = [];
  cheerioSources.each((index, item) => {
    if (item.attribs.srcset) {
      if (baseURL.includes("zitsticka.com")) {
        if (item.parent.parent.attribs.class) {
          if (
            item.parent.parent.attribs.class.includes(
              "c-reviewWidget-header-image"
            )
          ) {
            cheerioSourceArr.push(item.attribs.srcset.split(" ")[0]);
          }
        }
      } else {
        if (baseURL.includes("bergdorfgoodman.com")) {
          if (item.parent.parent.name === "div") {
            cheerioSourceArr.push(item.attribs.srcset.split(" ")[0]);
          }
        } else if (baseURL.includes("macys.com")) {
          if (item.parent.parent.attribs.class) {
            if (item.parent.parent.attribs.class.includes("main-img")) {
              cheerioSourceArr.push(item.attribs.srcset.split(" ")[0]);
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          cheerioSourceArr.push(item.attribs.srcset.split(" ")[0]);
        }
      }
    }
  });

  const cheerioMeta = $("meta");
  const cheerioMetaArr = [];
  cheerioMeta.each((index, item) => {
    if (item.attribs.itemprop === "image") {
      if (item.attribs.content) {
        cheerioMetaArr.push(item.attribs.content);
      }
    }
  });
  let pageTitle = $("title").text();

  const puppeteerGetTitle = async (page, browser) => {
    await page.setRequestInterception(true);

    // Prevent Javascript
    page.on("request", (request) => {
      request._interceptionHandled = false;
      request.continue();
      if (request.resourceType() === "script") {
        request._interceptionHandled = false;
        request.abort();
      }
    });

    page.on("error", (error) => console.error(error));

    await page
      .goto(shortenedURL, { waitUntil: "networkidle0" })
      .catch((e) => void 0);
    pageTitle = await page.title();

    await browser.close();
  };

  if (
    !pageTitle &&
    !baseURL.includes("loccitane.com") &&
    !baseURL.includes("tatcha.com")
  ) {
    puppeteerExtra.use(StealthPlugin());

    await puppeteerExtra
      .launch({
        headless: true,
        args: ["--no-sandbox", "--disable-features=site-per-process"],
        ignoreDefaultArgs: ["--enable-automation", "--disable-extensions"],
      })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);

        puppeteerGetTitle(page, browser);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const pageTitleArr = pageTitle
    .split(/[^[^A-Za-z0-9]+/g)
    .filter((x) => x.toLowerCase() !== "skin");
  const reformedPageTitle = pageTitleArr.join(" ").toLowerCase();

  const pageTitleMatchFunction = (item) => {
    const itemArr = item ? item.split(/[\s,\\/+&_\\.-]+/) : null;
    const matchedArr = [];

    if (itemArr) {
      for (let i = 0; i < pageTitleArr.length; i++) {
        for (let j = 0; j < itemArr.length; j++) {
          if (pageTitleArr[i].includes("\n")) {
            if (
              itemArr[j].toLowerCase() ===
              pageTitleArr[i].replace("\n", "").toLowerCase()
            ) {
              matchedArr.push(itemArr[j]);
            }
          } else {
            if (itemArr[j].toLowerCase() === pageTitleArr[i].toLowerCase()) {
              matchedArr.push(itemArr[j]);
            }
          }
        }
      }
    }

    if (matchedArr.length > 1) {
      return matchedArr.length;
    } else {
      return 0;
    }
  };

  let altURLExactMatchArr = [];

  const googleSearchPuppeteerFunction = async (page, browser) => {
    page.on("error", (error) => console.error(error));
    const shortenedURLArr = shortenedURL.split("/");
    const shortenedBaseUrl = baseURL.slice(baseURL.indexOf("www."));

    await page
      .goto(
        "http://images.google.com/search?tbm=isch&q=" +
          (baseURL.includes("loccitane.com")
            ? shortenedURL
            : baseURL.includes("philosophy.com")
            ? pageTitle
            : shortenedBaseUrl.split(".")[1] +
              " " +
              shortenedURLArr[shortenedURLArr.length - 1].split(".html")[0]),
        {
          waitUntil: "networkidle0",
        }
      )
      .catch((e) => void 0);

    const images = await page.evaluate(
      () =>
        Array.from(document.getElementsByTagName("img"), (e) => {
          if (e.className.includes("tx8vtf")) {
            return e.src;
          }
        }).filter((x) => x)[0]
    );

    await browser.close();

    return images;
  };

  if (
    baseURL.includes("loccitane.com") ||
    baseURL.includes("tatcha.com") ||
    baseURL.includes("philosophy.com")
  ) {
    puppeteerExtra.use(StealthPlugin());

    await puppeteerExtra
      .launch({
        headless: true,
        args: ["--disable-features=site-per-process"],
        ignoreDefaultArgs: ["--enable-automation", "--disable-extensions"],
      })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);

        const image = await googleSearchPuppeteerFunction(page, browser);

        if (image) {
          return altURLExactMatchArr.push({
            source: image,
            matches: 0,
          });
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const cheerioImageEachFuction = (outsideMatchesArr, index, item) => {
    const source = item.attribs.src
      ? !item.attribs.src.toLowerCase().includes("base64")
        ? item.attribs.src
        : null
      : null;
    const dataSource = item.attribs["data-src"]
      ? !item.attribs["data-src"].toLowerCase().includes("base64")
        ? item.attribs["data-src"]
        : null
      : null;
    let srcSetSource = item.attribs["srcset"]
      ? item.attribs["srcset"].split(",")
      : null;

    if (srcSetSource) {
      srcSetSource = srcSetSource[srcSetSource.length - 1].trim().split(" ")[0];
      if (srcSetSource.includes("base64")) {
        srcSetSource = null;
      }
    }

    const altArr = item.attribs.alt
      ? item.attribs.alt.split(/[^a-zA-Z0-9]/g).filter((x) => x !== "")
      : item.attribs["data-alt"]
      ? item.attribs["data-alt"].split(/[^a-zA-Z0-9]/g).filter((x) => x !== "")
      : null;

    let individualMatchesArr = [];

    const sourceURLMatchFunction = (source) => {
      const regexOnlyEnglishLetters = /^[a-z]+$/i;
      let sourceSectionArr = source ? source.split(/[\s,\/+&_-]+/) : null;
      const NOWFOODSRegex = /(w*(product_page_image)w*)/;
      const inkeyListRegex = /(w*(slider-1)w*)/;
      const clarinsRegex = /(w*(clarins-master-products)w*)/;

      if (sourceSectionArr) {
        for (let i = 0; i < sourceSectionArr.length; i++) {
          const camelCaseRegex = /([a-z])([A-Z])/;

          if (camelCaseRegex.test(sourceSectionArr[i])) {
            sourceSectionArr = sourceSectionArr.concat(
              sourceSectionArr[i]
                // insert a space before all caps
                .replace(/([A-Z])/g, " $1")
                .split(" ")
            );
          }
        }

        const matchedSourceArr = [];

        for (let i = 0; i < sourceSectionArr.length; i++) {
          if (regexOnlyEnglishLetters.test(sourceSectionArr[i])) {
            const regex = new RegExp(
              "(w*" + sourceSectionArr[i].toLowerCase() + "w*)"
            );

            if (parsedURL) {
              if (
                regex.test(
                  parsedURL.slice(parsedURL.indexOf("com") + 3).toLowerCase()
                ) ||
                (reformedPageTitle
                  ? altArr
                    ? altArr[i]
                      ? reformedPageTitle.includes(altArr[i].toLowerCase())
                      : null
                    : null
                  : null) ||
                (baseURL.includes("nowfoods") && NOWFOODSRegex.test(source)) ||
                (baseURL.includes("theinkeylist") &&
                  inkeyListRegex.test(source)) ||
                (baseURL.includes("clarinsusa") && clarinsRegex.test(source))
              ) {
                if (sourceSectionArr[i].length > 2) {
                  matchedSourceArr.push(sourceSectionArr[i]);
                }
              } else {
                if (regex.test(reformedPageTitle)) {
                  if (sourceSectionArr[i].length > 2) {
                    matchedSourceArr.push(sourceSectionArr[i]);
                  }
                }
              }
            } else {
              if (shortenedURL) {
                if (
                  regex.test(
                    shortenedURL
                      .slice(shortenedURL.indexOf("com") + 3)
                      .toLowerCase()
                  ) ||
                  (reformedPageTitleArr
                    ? altArr
                      ? reformedPageTitleArr.includes(altArr[i].toLowerCase())
                      : null
                    : null) ||
                  (baseURL.includes("nowfoods") &&
                    NOWFOODSRegex.test(source)) ||
                  (baseURL.includes("theinkeylist") &&
                    inkeyListRegex.test(source)) ||
                  (baseURL.includes("clarinsusa") && clarinsRegex.test(source))
                ) {
                  if (sourceSectionArr[i].length > 2) {
                    matchedSourceArr.push(sourceSectionArr[i]);
                  }
                }
              }
            }
          }
        }

        return matchedSourceArr;
      }
    };
    if (baseURL.includes("isdin.com") || baseURL.includes("biopelle.com")) {
      if (item.parent.attribs.class) {
        if (
          /(product-(primary|main)-image)/.test(
            item.parent.attribs.class.split(" ")[0]
          )
        ) {
          if (source || dataSource || srcSetSource) {
            return outsideMatchesArr.push({
              source: source || dataSource || srcSetSource,
              matches: 0,
            });
          }
        } else {
          return null;
        }
      }
    } else if (baseURL.includes("obagi.com")) {
      if (altArr && item.attribs["data-alt"]) {
        if (source || dataSource || srcSetSource) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        }
      } else if (item.parent.name === "picture") {
        if (source || dataSource || srcSetSource) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 0,
          });
        }
      }
    } else if (
      baseURL.includes("bioclarity.com") ||
      baseURL.includes("eltamd.com")
    ) {
      if (
        /(product-details__image)|(wp-post-image)|(primary-image)/.test(
          item.attribs.class
        )
      ) {
        if (source || dataSource || srcSetSource) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        }
      } else {
        return null;
      }
    } else if (
      baseURL.includes("follain.com") ||
      baseURL.includes("thesaemcosmetic.com")
    ) {
      if (/(Image--0)|(thumnailImgId)/.test(item.attribs.id)) {
        if (source || dataSource || srcSetSource) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        }
      } else {
        return null;
      }
    } else if (baseURL.includes("walgreens.com")) {
      if (item.attribs.alt) {
        if (/(Product Large Image)/.test(item.attribs.alt)) {
          if (source || dataSource || srcSetSource) {
            return outsideMatchesArr.push({
              source: source || dataSource || srcSetSource,
              matches: 5,
            });
          }
        } else {
          return null;
        }
      }
    } else if (
      baseURL.includes("lushusa.com") ||
      baseURL.includes("tomford.com") ||
      baseURL.includes("loccitane.com") ||
      baseURL.includes("lorealparisusa.com") ||
      baseURL.includes("laroche-posay")
    ) {
      if (
        /(pdp-main-img)|(primary-image)|(primary_image)|(product-image)/.test(
          item.attribs.class
        )
      ) {
        if (source || dataSource || srcSetSource) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        }
      } else {
        return null;
      }
    } else if (
      baseURL.includes("skinbiologique.com") ||
      baseURL.includes("origins.com") ||
      baseURL.includes("organysbeauty.com") ||
      baseURL.includes("peachandlily.com") ||
      baseURL.includes("drdennisgross.com") ||
      baseURL.includes("cremedelamer.com") ||
      baseURL.includes("gotoskincare.com")
    ) {
      if (
        /(zoomImg)|(js-product-image)|(wp-post-image)|(fotorama__img)|(js-product-image)|(Image--fadeIn)/.test(
          item.attribs.class
        )
      ) {
        if (source) {
          return outsideMatchesArr.push({
            source: source,
            matches: 5,
          });
        } else if (dataSource || srcSetSource) {
          if (!baseURL.includes("gotoskincare.com")) {
            return outsideMatchesArr.push({
              source: dataSource || srcSetSource,
              matches: 5,
            });
          } else {
            return null;
          }
        }
      } else {
        return null;
      }
    } else if (
      baseURL.includes("bulldogskincare.com") ||
      baseURL.includes("cosrx.com")
    ) {
      if (
        /(lslide active)|(gallery-placeholder)/.test(item.parent.attribs.class)
      ) {
        if (source || dataSource || srcSetSource) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        }
      } else {
        return null;
      }
    } else if (baseURL.includes("burtsbees.com")) {
      if (item.attribs["img-type"]) {
        if (/(1\.0)/.test(item.attribs["img-type"])) {
          if (item.attribs["data-hires"]) {
            return outsideMatchesArr.push({
              source: item.attribs["data-hires"],
              matches: 5,
            });
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else if (baseURL.includes("molecular-cosmetics.com")) {
      if (item.attribs.alt === "image-1") {
        if (source || dataSource || srcSetSource) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        }
      } else {
        return null;
      }
    } else if (baseURL.includes("weleda.com")) {
      if (item.attribs.class === "banner") {
        if (source || dataSource || srcSetSource) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        }
      } else {
        return null;
      }
    } else if (
      baseURL.includes("23yearsold.net") ||
      baseURL.includes("beautydiary.com")
    ) {
      if (
        item.parent.attribs.class === "Pic" ||
        item.parent.attribs.class === "product-pic"
      ) {
        if (source || dataSource || srcSetSource) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else if (baseURL.includes("sanitas-skincare.com")) {
      if (/(woocommerce-LoopProduct-link)/.test(item.parent.attribs.class)) {
        return outsideMatchesArr.push({
          source: source || dataSource || srcSetSource,
          matches: 5,
        });
      } else if (item.attribs.class) {
        if (item.attribs.class.includes("prod_slider_main")) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else if (baseURL.includes("cetaphil.com")) {
      if (item.attribs.class) {
        if (item.attribs.class.includes("img-responsive")) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else if (baseURL.includes("aperire-en.com")) {
      if (item.parent.attribs.class) {
        if (item.parent.attribs.class.includes("slick_col")) {
          return outsideMatchesArr.push({
            source: source || dataSource || srcSetSource,
            matches: 5,
          });
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    const transparentPixelRegex = new RegExp(/transparent.*pixel/);

    const urlExactMatchPushFunction = (source) => {
      if (individualMatchesArr.length >= 2) {
        if (source) {
          if (
            !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
              source.toLowerCase()
            )
          ) {
            if (
              baseURL.includes("aveeno") ||
              baseURL.includes("albertsons.com") ||
              baseURL.includes("lushusa.com")
            ) {
              return outsideMatchesArr.push({
                source: source,
                matches: individualMatchesArr.length,
              });
            } else {
              if (
                !/(desktop)+/.test(source.toLowerCase()) &&
                !baseURL.includes("buly1803.com")
              ) {
                if (
                  baseURL.includes("peterthomasroth") ||
                  baseURL.includes("fresh.com") ||
                  baseURL.includes("kiehls.com") ||
                  baseURL.includes("clarinsusa") ||
                  baseURL.includes("lancome-usa") ||
                  baseURL.includes("differin")
                ) {
                  if (baseURL.includes("clarinsusa")) {
                    if (
                      source
                        .toLowerCase()
                        .includes("sites-clarins-master-products")
                    ) {
                      return outsideMatchesArr.push({
                        source: source,
                        matches: individualMatchesArr.length,
                      });
                    }
                  } else if (
                    !transparentPixelRegex.test(source.toLowerCase())
                  ) {
                    return outsideMatchesArr.push({
                      source: source,
                      matches: individualMatchesArr.length,
                    });
                  }
                } else if (!transparentPixelRegex.test(source.toLowerCase())) {
                  return outsideMatchesArr.push({
                    source: source,
                    matches: individualMatchesArr.length,
                  });
                }
              } else {
                if (!/default/gm.test(source.toLowerCase())) {
                  if (!transparentPixelRegex.test(source.toLowerCase())) {
                    return outsideMatchesArr.push({
                      source: source,
                      matches: individualMatchesArr.length,
                    });
                  }
                }
              }
            }
          }
        }
      } else {
        const titleMatch = pageTitleMatchFunction(item.attribs.alt);

        if (titleMatch) {
          if (source) {
            if (
              !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                source.toLowerCase()
              )
            ) {
              if (
                baseURL.includes("aveeno")
                  ? true
                  : /(desktop)+/.test(source.toLowerCase())
              ) {
                if (
                  baseURL.includes("peterthomasroth") ||
                  baseURL.includes("fresh.com") ||
                  baseURL.includes("kiehls.com") ||
                  baseURL.includes("clarinsusa") ||
                  baseURL.includes("lancome-usa")
                ) {
                  if (!transparentPixelRegex.test(source.toLowerCase())) {
                    return outsideMatchesArr.push({
                      source: source,
                      matches: individualMatchesArr.length,
                    });
                  }
                } else {
                  if (!/default/gm.test(source.toLowerCase())) {
                    if (!transparentPixelRegex.test(source.toLowerCase())) {
                      return outsideMatchesArr.push({
                        source: source,
                        matches: individualMatchesArr.length,
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    if (altArr) {
      if (altArr.length > 0) {
        const regexOnlyEnglishLetters = /^[a-z]+$/i;

        if (altArr.length < 20) {
          for (let i = 0; i < altArr.length; i++) {
            if (regexOnlyEnglishLetters.test(altArr[i])) {
              const regex = new RegExp("(w*" + altArr[i].toLowerCase() + "w*)");
              if (
                regex.test(
                  shortenedURL
                    .slice(shortenedURL.indexOf("com") + 3)
                    .toLowerCase()
                    .split("/")
                    .sort(function (a, b) {
                      return b.length - a.length;
                    })[0]
                ) ||
                pageTitle.includes(altArr[i])
              ) {
                if (altArr[i].length > 2) {
                  individualMatchesArr.push(altArr[i]);
                }
              } else {
                if (baseURL.includes("ahava")) {
                  const conditions = ["main", "product", "photo"];
                  if (
                    conditions.some((x) => altArr[i].toLowerCase().includes(x))
                  ) {
                    individualMatchesArr.push(altArr[i]);
                  }
                }
              }
            }
          }
        }

        if (individualMatchesArr.length <= 3 || altArr.length > 20) {
          const sourceMatchArr = sourceURLMatchFunction(
            source || dataSource || srcSetSource
          );

          individualMatchesArr = individualMatchesArr.concat(sourceMatchArr);
        }
        urlExactMatchPushFunction(source || dataSource || srcSetSource);
      }
    } else if (source || dataSource || srcSetSource) {
      let sourceMatchArr = sourceURLMatchFunction(
        source || dataSource || srcSetSource
      );

      if (individualMatchesArr.length >= 2) {
        individualMatchesArr = individualMatchesArr.concat(sourceMatchArr);
        urlExactMatchPushFunction(source || dataSource || srcSetSource);
      } else {
        if (baseURL.includes("target") || baseURL.includes("fresh.com")) {
          if (item.parent.name === "picture") {
            return outsideMatchesArr.push({
              source: source || dataSource || srcSetSource,
              matches: 0,
            });
          }
        } else if (
          baseURL.includes("nowfoods") ||
          baseURL.includes("theinkeylist") ||
          baseURL.includes("mariobadescu") ||
          baseURL.includes("eminenceorganics")
        ) {
          if (sourceMatchArr.length > 2) {
            return outsideMatchesArr.push({
              source: source || dataSource || srcSetSource,
              matches: sourceMatchArr.length,
            });
          }
        }
      }
    }
  };

  const cheerioDivEachFunction = (outsideMatchesArr, index, item) => {
    const dataSource = item.attribs["data-src"]
      ? item.attribs["data-src"]
      : item.attribs["data-img-src"]
      ? item.attribs["data-img-src"]
      : null;

    const individualMatchesArr = [];

    if (baseURL.includes("tonymoly")) {
      if (dataSource) {
        return outsideMatchesArr.push({
          source: dataSource,
          matches: 100,
        });
      }
    }
    const sourceURLMatchFunction = (source) => {
      const regexOnlyEnglishLetters = /^[a-z]+$/i;
      let sourceSectionArr = source ? source.split(/[\s,\/+&_-]+/) : null;

      if (sourceSectionArr) {
        for (let i = 0; i < sourceSectionArr.length; i++) {
          const camelCaseRegex = /([a-z])([A-Z])/;

          if (camelCaseRegex.test(sourceSectionArr[i])) {
            sourceSectionArr = sourceSectionArr.concat(
              sourceSectionArr[i]
                // insert a space before all caps
                .replace(/([A-Z])/g, " $1")
                .split(" ")
            );
          }
        }

        for (let i = 0; i < sourceSectionArr.length; i++) {
          if (regexOnlyEnglishLetters.test(sourceSectionArr[i])) {
            const regex = new RegExp(
              "(w*" + sourceSectionArr[i].toLowerCase() + "w*)"
            );
            if (parsedURL) {
              if (
                regex.test(
                  parsedURL.slice(parsedURL.indexOf("com") + 3).toLowerCase()
                )
              ) {
                if (sourceSectionArr[i].length > 2) {
                  individualMatchesArr.push(sourceSectionArr[i]);
                }
              } else {
                if (regex.test(reformedPageTitle)) {
                  if (sourceSectionArr[i].length > 2) {
                    individualMatchesArr.push(sourceSectionArr[i]);
                  }
                }
              }
            } else {
              if (shortenedURL) {
                if (
                  regex.test(
                    shortenedURL
                      .slice(shortenedURL.indexOf("com") + 3)
                      .toLowerCase()
                  )
                ) {
                  if (sourceSectionArr[i].length > 2) {
                    individualMatchesArr.push(sourceSectionArr[i]);
                  }
                }
              }
            }
          }
        }
      }
    };

    const transparentPixelRegex = new RegExp(/transparent.*pixel/);

    const urlExactMatchPushFunction = (source) => {
      if (individualMatchesArr.length >= 2) {
        if (source) {
          if (
            !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
              source.toLowerCase()
            ) &&
            (baseURL
              .includes("peterthomasroth")
              .filter((x) =>
                baseURL.includes("aveeno")
                  ? true
                  : /(desktop)+/.test(x.toLowerCase())
              ) ||
            baseURL.includes("fresh.com") ||
            baseURL.includes("kiehls.com")
              ? true
              : !/default/gm.test(source.toLowerCase()))
          ) {
            if (
              baseURL.includes("aveeno")
                ? true
                : !/(desktop)+/.test(x.source.toLowerCase())
            ) {
              if (!transparentPixelRegex.test(source.toLowerCase())) {
                return outsideMatchesArr.push({
                  source: source,
                  matches: individualMatchesArr.length,
                });
              }
            }
          }
        }
      }
    };

    if (dataSource) {
      sourceURLMatchFunction(dataSource);

      if (individualMatchesArr.length >= 2) {
        urlExactMatchPushFunction(dataSource);
      }
    }
  };

  cheerioImages.each((index, item) =>
    cheerioImageEachFuction(altURLExactMatchArr, index, item)
  );

  cheerioDivs.each((index, item) =>
    cheerioDivEachFunction(altURLExactMatchArr, index, item)
  );

  cheerioHREF.each((index, item) =>
    cheerioImageEachFuction(altURLExactMatchArr, index, item)
  );

  const whiteSpaceRegex = /\s/g;
  const matchesLengthArr = altURLExactMatchArr.map((x) => x.matches);

  const testURLTitleMatchFunction = () => {
    if (
      altURLExactMatchArr
        .filter((x) => !whiteSpaceRegex.test(x.source))
        .filter((x) => !x.source.toLowerCase().includes("logo"))
        .filter(
          (x) => x.source.split("/").sort((a, b) => b.length - a.length)[0]
        )
        .sort((a, b) => b.matches - a.matches).length > 0
    ) {
      const pageTitleMatches = Math.max(
        ...altURLExactMatchArr.map((x) =>
          pageTitleMatchFunction(
            x.source.split("/").sort((a, b) => b.length - a.length)[0]
          )
        )
      );

      if (pageTitleMatches > 0) {
        if (baseURL.includes("dove")) {
          return altURLExactMatchArr
            .filter((x) => !whiteSpaceRegex.test(x.source))
            .filter((x) => !x.source.toLowerCase().includes("logo"))
            .filter((x) => !x.source.toLowerCase().includes("dove.png"))[0]
            .source;
        }
        return altURLExactMatchArr
          .filter((x) => !whiteSpaceRegex.test(x.source))
          .filter((x) => !x.source.toLowerCase().includes("logo"))
          .filter(
            (x) =>
              pageTitleMatchFunction(
                x.source.split("/").sort((a, b) => b.length - a.length)[0]
              ) === pageTitleMatches
          )[0].source;
      } else {
        return altURLExactMatchArr
          .filter((x) => !whiteSpaceRegex.test(x.source))
          .filter((x) => !x.source.toLowerCase().includes("logo"))
          .filter(
            (x) => x.source.split("/").sort((a, b) => b.length - a.length)[0]
          )[0].source;
      }
    } else {
      return altURLExactMatchArr
        .filter((x) => !whiteSpaceRegex.test(x.source))
        .filter((x) => !x.source.toLowerCase().includes("logo"))
        .filter((x) => {
          if (Math.abs(x.matches - Math.max(...matchesLengthArr)) <= 2) {
            return true;
          }
        })[0].source;
    }
  };

  if (baseURL.includes("murad")) {
    altURLExactMatchArr = altURLExactMatchArr.filter((x) =>
      x.source.includes("cdn11.bigcommerce.com")
    );
  } else if (baseURL.includes("herbivore")) {
    altURLExactMatchArr = altURLExactMatchArr.filter(
      (x) => !x.source.includes("thumb")
    );
  }

  let mainCheerioImageAltExactMatch = baseURL.includes("amazon")
    ? amazonMainImageArr.filter(
        (x) =>
          !/logo|svg|spacer|loader|gif|default|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|desktop|sweetcef|bazaarvoice|video|tiny/gm.test(
            x.toLowerCase()
          )
      )[0]
    : baseURL.includes("skincarejungle") ||
      baseURL.includes("paparecipe") ||
      baseURL.includes("baxterofcalifornia.com") ||
      baseURL.includes("skinceuticals.com") ||
      baseURL.includes("olehenriksen.com") ||
      baseURL.includes("shiseido.com") ||
      baseURL.includes("dermalogica.com") ||
      baseURL.includes("marykay.com") ||
      baseURL.includes("tula.com")
    ? cheerioHREFArr[0]
    : baseURL.includes("aesop.com") || baseURL.includes("zitsticka.com")
    ? cheerioSourceArr[0]
    : baseURL.includes("bergdorfgoodman.com") || baseURL.includes("macys.com")
    ? cheerioSourceArr[cheerioSourceArr.length - 1]
    : baseURL.includes("bluemercury.com")
    ? cheerioMetaArr[0]
    : altURLExactMatchArr.length > 0
    ? baseURL.includes("obagi.com") ||
      baseURL.includes("nourishorganic.com") ||
      baseURL.includes("follain.com") ||
      baseURL.includes("lovesunbody.com") ||
      baseURL.includes("lushusa.com") ||
      baseURL.includes("thefaceshop.com") ||
      baseURL.includes("brickellmensproducts.com") ||
      baseURL.includes("buly1803.com") ||
      baseURL.includes("hommeface.com") ||
      baseURL.includes("kyprisbeauty.com") ||
      baseURL.includes("essenherb.co") ||
      baseURL.includes("sk-ii.com") ||
      baseURL.includes("olay.com") ||
      baseURL.includes("burtsbees.com") ||
      baseURL.includes("molecular-cosmetics.com") ||
      baseURL.includes("eltamd.com") ||
      baseURL.includes("weleda.com") ||
      baseURL.includes("loccitane.com") ||
      baseURL.includes("drdennisgross.com") ||
      baseURL.includes("tatcha.com") ||
      baseURL.includes("23yearsold.net") ||
      baseURL.includes("beautydiary.com") ||
      baseURL.includes("philosophy.com") ||
      baseURL.includes("smashbox.com") ||
      baseURL.includes("sanitas-skincare.com") ||
      baseURL.includes("hsn.com") ||
      baseURL.includes("zoskinhealth.com") ||
      baseURL.includes("aperire-en.com") ||
      baseURL.includes("laroche-posay")
      ? altURLExactMatchArr[0].source
      : baseURL.includes("rocskincare.com")
      ? altURLExactMatchArr.filter((x) => !x.source.includes("megamenu"))[0]
          .source
      : baseURL.includes("versedskin.com") ||
        baseURL.includes("zitsticka.com") ||
        baseURL.includes("neimanmarcus.com") ||
        baseURL.includes("epielle.com")
      ? altURLExactMatchArr[1].source
      : baseURL.includes("organysbeauty.com") ||
        baseURL.includes("gotoskincare.com")
      ? altURLExactMatchArr[altURLExactMatchArr.length - 1].source
      : altURLExactMatchArr.length === 1
      ? baseURL.includes("pcaskin")
        ? null
        : baseURL.includes("esthemax") ||
          baseURL.includes("nowfoods") ||
          baseURL.includes("goop.com") ||
          baseURL.includes("clarinsusa") ||
          baseURL.includes("lancome-usa") ||
          baseURL.includes("isdin.com") ||
          baseURL.includes("biopelle.com") ||
          baseURL.includes("obagi.com") ||
          baseURL.includes("stylevana.com") ||
          baseURL.includes("cvs.com") ||
          baseURL.includes("walgreens.com") ||
          baseURL.includes("albertsons.com") ||
          baseURL.includes("tomford.com") ||
          baseURL.includes("medihealus.com")
        ? altURLExactMatchArr
            .filter((x) =>
              baseURL.includes("isdin.com")
                ? true
                : !whiteSpaceRegex.test(x.source)
            )
            .filter(
              (x) =>
                !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|before|steps|subnav|btn|kiehls_us-library/gm.test(
                  x.source.toLowerCase()
                )
            )
            .filter((x) =>
              baseURL.includes("biopelle.com")
                ? true
                : !/results/gm.test(x.source.toLowerCase())
            )[0].source
        : null
      : baseURL.includes("glamglow") ||
        baseURL.includes("caudalie") ||
        baseURL.includes("skincarejungle") ||
        baseURL.includes("krave") ||
        baseURL.includes("ulta") ||
        baseURL.includes("herocosmetics") ||
        baseURL.includes("versedskin") ||
        baseURL.includes("dior.com") ||
        baseURL.includes("aveeno.com") ||
        baseURL.includes("vaseline.com") ||
        baseURL.includes("aquaphorus") ||
        baseURL.includes("skinmedica") ||
        baseURL.includes("indielee.com") ||
        baseURL.includes("thebeautychef.com") ||
        baseURL.includes("influenster.com") ||
        baseURL.includes("glowieco.com") ||
        baseURL.includes("misshaus.com") ||
        baseURL.includes("stylekorean.com") ||
        baseURL.includes("malinandgoetz.com") ||
        baseURL.includes("vennskincare.com") ||
        baseURL.includes("renskincare.com") ||
        baseURL.includes("ilapothecary.com") ||
        baseURL.includes("bulldogskincare.com") ||
        baseURL.includes("credobeauty.com") ||
        baseURL.includes("koraorganics.com") ||
        baseURL.includes("edenbelle.com") ||
        baseURL.includes("cosrx.com") ||
        baseURL.includes("rodanandfields.com") ||
        baseURL.includes("generationclay.com") ||
        baseURL.includes("kylieskin.com") ||
        baseURL.includes("philosophy.com") ||
        baseURL.includes("bluemercury.com") ||
        baseURL.includes("laprairie.com") ||
        baseURL.includes("katesomerville.com") ||
        baseURL.includes("snowfoxskincare.com")
      ? null
      : altURLExactMatchArr.length <= 2 &&
        matchesLengthArr.every((x) => x <= 2) &&
        !baseURL.includes("pcaskin")
      ? null
      : matchesLengthArr.length > 2 &&
        matchesLengthArr.every((x) => x === matchesLengthArr[0])
      ? altURLExactMatchArr
          .filter((x) => !whiteSpaceRegex.test(x.source))
          .filter((x) =>
            !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
              x.source.toLowerCase()
            ) &&
            (baseURL.includes("peterthomasroth") ||
              baseURL.includes("fresh.com") ||
              baseURL.includes("kiehls.com") ||
              baseURL.includes("clarinsusa") ||
              baseURL.includes("bioclarity.com") ||
              baseURL.includes("lancome-usa"))
              ? true
              : !/default/gm.test(x.source.toLowerCase())
          )
          .filter((x) =>
            baseURL.includes("aveeno")
              ? true
              : !/(desktop)+/.test(x.source.toLowerCase())
          )[0]
        ? altURLExactMatchArr
            .filter((x) => !whiteSpaceRegex.test(x.source))
            .filter((x) =>
              !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                x.source.toLowerCase()
              ) &&
              (baseURL.includes("peterthomasroth") ||
                baseURL.includes("fresh.com") ||
                baseURL.includes("kiehls.com") ||
                baseURL.includes("clarinsusa") ||
                baseURL.includes("bioclarity.com") ||
                baseURL.includes("lancome-usa"))
                ? true
                : !/default/gm.test(x.source.toLowerCase())
            )
            .filter((x) =>
              baseURL.includes("aveeno")
                ? true
                : !/(desktop)+/.test(x.source.toLowerCase())
            )[0].source
          ? altURLExactMatchArr
              .filter((x) => !whiteSpaceRegex.test(x.source))
              .filter((x) =>
                !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                  x.source.toLowerCase()
                ) &&
                (baseURL.includes("peterthomasroth") ||
                  baseURL.includes("fresh.com") ||
                  baseURL.includes("kiehls.com") ||
                  baseURL.includes("clarinsusa") ||
                  baseURL.includes("bioclarity.com") ||
                  baseURL.includes("lancome-usa"))
                  ? true
                  : !/default/gm.test(x.source.toLowerCase())
              )
              .filter((x) =>
                baseURL.includes("aveeno")
                  ? true
                  : !/(desktop)+/.test(x.source.toLowerCase())
              )[0].source
          : null
        : null
      : altURLExactMatchArr.length >= 16
      ? altURLExactMatchArr
          .filter((x) =>
            baseURL.includes("isdin.com") || baseURL.includes("sentelabs")
              ? Math.abs(x.matches - Math.max(...matchesLengthArr)) <= 1
              : x.matches === Math.max(...matchesLengthArr)
          )
          .filter((x) =>
            baseURL.includes("isdin.com")
              ? x.source.includes("sw=645&sh=645&")
              : true
          )[0].source
      : Math.max(...matchesLengthArr) >= 4 &&
        altURLExactMatchArr.filter(
          (x) => x.matches === Math.max(...matchesLengthArr)
        ).length >= 3
      ? baseURL.includes("fresh.com") ||
        baseURL.includes("sundayriley") ||
        baseURL.includes("dove.com") ||
        baseURL.includes("gotoskincare.com")
        ? altURLExactMatchArr
            .filter((x) =>
              baseURL.includes("dove.com")
                ? true
                : x.matches === Math.max(...matchesLengthArr)
            )
            .filter(
              (x) =>
                x.source.toLowerCase().includes("pack") &&
                x.source.toLowerCase().includes("shot")
            )
            .filter((x) => !whiteSpaceRegex.test(x.source))
            .filter(
              (x) =>
                !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                  x.source.toLowerCase()
                )
            )[0].source
        : baseURL.includes("neutrogena") ||
          baseURL.includes("sentelabs") ||
          baseURL.includes("notobotanics.com") ||
          baseURL.includes("eminenceorganics.com")
        ? altURLExactMatchArr
            .filter((x) =>
              baseURL.includes("sentelabs") ||
              baseURL.includes("eminenceorganics.com")
                ? Math.abs(x.matches - Math.max(...matchesLengthArr)) <= 1
                : x.matches === Math.max(...matchesLengthArr)
            )
            .filter((x) => !whiteSpaceRegex.test(x.source))
            .filter(
              (x) =>
                !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                  x.source.toLowerCase()
                )
            )[0]
          ? altURLExactMatchArr
              .filter((x) =>
                baseURL.includes("sentelabs") ||
                baseURL.includes("eminenceorganics.com")
                  ? Math.abs(x.matches - Math.max(...matchesLengthArr)) <= 1
                  : x.matches === Math.max(...matchesLengthArr)
              )
              .filter((x) => !whiteSpaceRegex.test(x.source))
              .filter(
                (x) =>
                  !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                    x.source.toLowerCase()
                  )
              )[0].source
            ? altURLExactMatchArr
                .filter((x) =>
                  baseURL.includes("sentelabs") ||
                  baseURL.includes("eminenceorganics.com")
                    ? Math.abs(x.matches - Math.max(...matchesLengthArr)) <= 1
                    : x.matches === Math.max(...matchesLengthArr)
                )
                .filter((x) => !whiteSpaceRegex.test(x.source))
                .filter(
                  (x) =>
                    !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                      x.source.toLowerCase()
                    )
                )[0].source
            : null
          : null
        : null
      : baseURL.includes("fresh.com") ||
        baseURL.includes("summerfridays") ||
        baseURL.includes("sentelabs") ||
        baseURL.includes("eminenceorganics.com") ||
        baseURL.includes("tonymoly") ||
        baseURL.includes("gotoskincare.com")
      ? altURLExactMatchArr
          .filter((x) =>
            baseURL.includes("sentelabs") ||
            baseURL.includes("eminenceorganics.com")
              ? Math.abs(x.matches - Math.max(...matchesLengthArr)) <= 1
              : x.matches === Math.max(...matchesLengthArr)
          )
          .filter((x) => !whiteSpaceRegex.test(x.source))
          .filter(
            (x) =>
              !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                x.source.toLowerCase()
              )
          )[0]
        ? altURLExactMatchArr
            .filter((x) =>
              baseURL.includes("sentelabs") ||
              baseURL.includes("eminenceorganics.com")
                ? Math.abs(x.matches - Math.max(...matchesLengthArr)) <= 1
                : x.matches === Math.max(...matchesLengthArr)
            )
            .filter((x) => !whiteSpaceRegex.test(x.source))
            .filter(
              (x) =>
                !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                  x.source.toLowerCase()
                )
            )[0].source
          ? altURLExactMatchArr
              .filter((x) =>
                baseURL.includes("sentelabs") ||
                baseURL.includes("eminenceorganics.com")
                  ? Math.abs(x.matches - Math.max(...matchesLengthArr)) <= 1
                  : x.matches === Math.max(...matchesLengthArr)
              )
              .filter((x) => !whiteSpaceRegex.test(x.source))
              .filter(
                (x) =>
                  !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                    x.source.toLowerCase()
                  )
              )[0].source
          : null
        : baseURL.includes("fresh.com")
        ? altURLExactMatchArr
            .filter((x) => x.matches === Math.max(...matchesLengthArr))
            .filter((x) => !whiteSpaceRegex.test(x.source))
            .filter(
              (x) =>
                !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                  x.source.toLowerCase()
                )
            )[0]
          ? altURLExactMatchArr
              .filter((x) => x.matches === Math.max(...matchesLengthArr))
              .filter((x) => !whiteSpaceRegex.test(x.source))
              .filter(
                (x) =>
                  !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                    x.source.toLowerCase()
                  )
              )[0].source
            ? altURLExactMatchArr
                .filter((x) => x.matches === Math.max(...matchesLengthArr))
                .filter((x) => !whiteSpaceRegex.test(x.source))
                .filter(
                  (x) =>
                    !/logo|svg|spacer|desktop|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
                      x.source.toLowerCase()
                    )
                )[0].source
            : null
          : null
        : null
      : testURLTitleMatchFunction(baseURL)
    : null;

  const regexMatchReplaceFunction = (exactMatch) => {
    const regexJPGPNG = /_([0-9]+)x([.png]+[.jpg]+)/g;
    const regexJPGPNGAlt = /_x([0-9]+)([.png]+[.jpg]+)/g;
    const regexWidthFull = /_({width})x([.png]+[.jpg]+)/g;
    const regexWidthPartial = /({width})/g;
    const amazonRegex = /._[A-Z]+[0-9]+_.[jpg]+[png]+/g;
    const amazonLXWRegex = /_[A-Z]+[0-9]+,[0-9]+_.[jpg]+[png]+/g;
    const amazonLXWPartialRegex = /[0-9]+,[0-9]+_.[jpg]+[png]+/g;
    const amazonPartialRegex = /[0-9]+_.[jpg]+[png]+/g;
    const lancomeRegex = /.[jpg]+[png]+\?sw=[0-9]+&sh=[0-9]+/g;
    const lushUSARegex = /.[jpg]+[png]+\?sw=[0-9]+&sh=[0-9]+&q=1/g;
    const edenBelleRegex = /_[0-9]+x[0-9]+.[jpg]+[png]+[.jpeg]+/g;
    const jpegRegex = /(format=jpeg&w=)[0-9]+&h=[0-9]+/g;
    const numberRegex = /([0-9]+)/g;
    const matchedSection = exactMatch.match(regexJPGPNG);
    const matchedSectionAlt = exactMatch.match(regexJPGPNGAlt);

    if (regexJPGPNG.test(exactMatch)) {
      if (exactMatch.includes(".jpg")) {
        if (Number(matchedSection[0].match(numberRegex)) < 300) {
          exactMatch = exactMatch.replace(
            regexJPGPNG,
            "_" +
              (Number(matchedSection[0].match(numberRegex)) + 300).toString() +
              "x.jpg"
          );
        }
      } else if (exactMatch.includes(".png")) {
        if (Number(matchedSection[0].match(numberRegex)) < 300) {
          exactMatch = exactMatch.replace(
            regexJPGPNG,
            "_" +
              (Number(matchedSection[0].match(numberRegex)) + 300).toString() +
              "x.png"
          );
        }
      }
    } else if (regexJPGPNGAlt.test(exactMatch)) {
      if (exactMatch.includes(".jpg")) {
        if (Number(matchedSectionAlt[0].match(numberRegex)) < 300) {
          exactMatch = exactMatch.replace(
            regexJPGPNGAlt,
            "_x" +
              (
                Number(matchedSectionAlt[0].match(numberRegex)) + 300
              ).toString() +
              ".jpg"
          );
        }
      } else if (exactMatch.includes(".png")) {
        if (Number(matchedSectionAlt[0].match(numberRegex)) < 300) {
          exactMatch = exactMatch.replace(
            regexJPGPNGAlt,
            "_x" +
              (
                Number(matchedSectionAlt[0].match(numberRegex)) + 300
              ).toString() +
              ".png"
          );
        }
      }
    } else if (regexWidthFull.test(exactMatch)) {
      exactMatch = exactMatch.replace(regexWidthPartial, "500");
    } else if (amazonRegex.test(exactMatch)) {
      if (exactMatch.includes(".jpg")) {
        exactMatch = exactMatch.replace(amazonPartialRegex, "500_.jpg");
      } else if (exactMatch.includes(".png")) {
        exactMatch = exactMatch.replace(amazonPartialRegex, "500_.png");
      }
    } else if (amazonLXWRegex.test(exactMatch)) {
      if (exactMatch.includes(".jpg")) {
        exactMatch = exactMatch.replace(amazonLXWPartialRegex, "500,500_.jpg");
      } else if (exactMatch.includes(".png")) {
        exactMatch = exactMatch.replace(amazonLXWPartialRegex, "500,500_.png");
      }
    } else if (jpegRegex.test(exactMatch)) {
      exactMatch = exactMatch.replace(jpegRegex, "format=jpeg&w=500&h=500");
    } else if (lancomeRegex.test(exactMatch)) {
      if (baseURL.includes("lushusa.com") && lushUSARegex.test(exactMatch)) {
        exactMatch = exactMatch.replace("&q=1", "");
      }
      if (exactMatch.includes(".jpg")) {
        exactMatch = exactMatch.replace(lancomeRegex, ".jpg?sw=500&sh=500");
      } else if (exactMatch.includes(".png")) {
        exactMatch = exactMatch.replace(lancomeRegex, ".png?sw=500&sh=500");
      }
    } else if (
      edenBelleRegex.test(exactMatch) &&
      (baseURL.includes("edenbelle.com") || baseURL.includes("algenist.com"))
    ) {
      if (exactMatch.includes(".jpg")) {
        exactMatch = exactMatch.replace(edenBelleRegex, "_500x500.jpg");
      } else if (exactMatch.includes(".png")) {
        exactMatch = exactMatch.replace(edenBelleRegex, "_500x500.png");
      } else if (exactMatch.includes(".jpeg")) {
        exactMatch = exactMatch.replace(edenBelleRegex, "_500x500.jpeg");
      }
    }

    return exactMatch;
  };

  if (mainCheerioImageAltExactMatch) {
    if (
      typeof mainCheerioImageAltExactMatch === "object" &&
      mainCheerioImageAltExactMatch.length > 1
    ) {
      mainCheerioImageAltExactMatch = mainCheerioImageAltExactMatch[0];
    }
    if (
      !mainCheerioImageAltExactMatch.includes("http://") &&
      !mainCheerioImageAltExactMatch.includes("https://") &&
      !mainCheerioImageAltExactMatch.includes(".com") &&
      !mainCheerioImageAltExactMatch.includes(".net") &&
      !mainCheerioImageAltExactMatch.includes("scripts/timthumb.php?src=") &&
      !baseURL.includes("loccitane.com") &&
      !baseURL.includes("tatcha.com") &&
      !baseURL.includes("philosophy.com")
    ) {
      mainCheerioImageAltExactMatch =
        baseURL +
        mainCheerioImageAltExactMatch.slice(
          mainCheerioImageAltExactMatch.indexOf("/")
        );
    } else if (
      mainCheerioImageAltExactMatch.includes("scripts/timthumb.php?src=")
    ) {
      mainCheerioImageAltExactMatch =
        baseURL + "/" + mainCheerioImageAltExactMatch;
    }
    mainImage = regexMatchReplaceFunction(mainCheerioImageAltExactMatch);
  } else {
    puppeteerExtra.use(StealthPlugin());

    let largest_image;
    let cheerioPuppeteerImages;

    await puppeteerExtra
      .launch({
        headless: true,
        args: ["--disable-features=site-per-process"],
        ignoreDefaultArgs: ["--enable-automation", "--disable-extensions"],
      })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.setRequestInterception(true);

        // Prevent Javascript
        page.on("request", (request) => {
          request._interceptionHandled = false;
          request.continue();
          if (request.resourceType() === "script") {
            request._interceptionHandled = false;
            request.abort();
          }
        });

        page.on(
          "domcontentloaded",
          async () => await page.addStyleTag({ path: "css.css" })
        );

        page.on("error", (error) => console.error(error));

        await page
          .goto(shortenedURL, { waitUntil: "networkidle0", timeout: 10000 })
          .catch((e) => void 0);

        const puppeteerHTML = await page.content();

        const $ = cheerio.load(puppeteerHTML);

        cheerioPuppeteerImages = $("img");

        largest_image = await page.evaluate(() => {
          debugger;

          let imageTagArr = [...document.getElementsByTagName("img")];

          let imageBackgroundURLArr = [...document.getElementsByTagName("div")]
            .filter((x) => {
              const backgroundImage = window
                .getComputedStyle(x)
                .getPropertyValue("background-image");

              if (backgroundImage) {
                return true;
              }
            })
            .map((x) =>
              window
                .getComputedStyle(x)
                .getPropertyValue("background-image")
                .replace(/.*\s?url\([\'\"]?/, "")
                .replace(/[\'\"]?\).*/, "")
            )
            .filter((x) => !x.includes("linear-gradient"));

          let renSkincareImageBackgroundURLArr = [
            ...document.getElementsByTagName("div"),
          ]
            .filter((x) => {
              const backgroundImage = window
                .getComputedStyle(x)
                .getPropertyValue("background-image");

              if (backgroundImage) {
                return true;
              }
            })
            .filter((x) =>
              x.getAttribute("class") === "bg-area-placeholder" &&
              x.parentElement.parentElement.parentElement.getAttribute("class")
                ? x.parentElement.parentElement.parentElement
                    .getAttribute("class")
                    .split(" ")
                    .includes("slick-current")
                : null
            )
            .map((x) =>
              window
                .getComputedStyle(x)
                .getPropertyValue("background-image")
                .replace(/.*\s?url\([\'\"]?/, "")
                .replace(/[\'\"]?\).*/, "")
            );

          let imageBackgroundSectionURLArr = [
            ...document.getElementsByTagName("section"),
          ]
            .filter((x) => {
              const backgroundImage = window
                .getComputedStyle(x)
                .getPropertyValue("background-image");

              if (backgroundImage) {
                return true;
              }
            })
            .map((x) =>
              window
                .getComputedStyle(x)
                .getPropertyValue("background-image")
                .replace(/.*\s?url\([\'\"]?/, "")
                .replace(/[\'\"]?\).*/, "")
            );
          let canvasBackgroundURLArr = [
            ...document.getElementsByTagName("canvas"),
          ]
            .filter((x) => {
              const backgroundImage = window
                .getComputedStyle(x)
                .getPropertyValue("background-image");

              if (backgroundImage) {
                return true;
              }
            })
            .map((x) =>
              window
                .getComputedStyle(x)
                .getPropertyValue("background-image")
                .replace(/.*\s?url\([\'\"]?/, "")
                .replace(/[\'\"]?\).*/, "")
            );

          if (location.href.includes("glamglow")) {
            imageTagArr = imageTagArr.filter((x) =>
              x ? (x.src ? !x.src.includes("54x54") : null) : null
            );
            imageBackgroundURLArr = imageBackgroundURLArr.filter((x) =>
              x ? (x.src ? !x.src.includes("54x54") : null) : null
            );
          } else if (
            location.href.includes("herocosmetics") ||
            location.href.includes("indielee.com") ||
            location.href.includes("vennskincare.com")
          ) {
            return imageBackgroundURLArr.filter((x) => x !== "none")[1];
          } else if (
            location.href.includes("ursamajorvt.com") ||
            location.href.includes("generationclay.com") ||
            location.href.includes("laprairie.com")
          ) {
            return imageBackgroundURLArr.filter((x) => x !== "none")[0];
          } else if (location.href.includes("katesomerville.com")) {
            return imageBackgroundURLArr.filter((x) => x !== "none")[
              imageBackgroundURLArr.filter((x) => x !== "none").length - 1
            ];
          } else if (location.href.includes("differin.com")) {
            if (imageBackgroundSectionURLArr) {
              return imageBackgroundSectionURLArr.filter(
                (x) => x !== "none"
              )[0];
            }
          } else if (location.href.includes("thebeautychef.com")) {
            if (canvasBackgroundURLArr) {
              return canvasBackgroundURLArr.filter((x) => x !== "none")[1];
            }
          } else if (location.href.includes("renskincare.com")) {
            return renSkincareImageBackgroundURLArr.filter(
              (x) => x !== "none"
            )[0];
          }

          if (imageTagArr) {
            if (imageBackgroundURLArr) {
              if (
                imageTagArr
                  .concat(imageBackgroundURLArr)
                  .sort(
                    (a, b) =>
                      b.scrollWidth * b.scrollHeight -
                      a.scrollWidth * a.scrollHeight
                  )
                  .filter((x) => {
                    if (x.src) {
                      if (
                        !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library|video|tiny/gm.test(
                          x.src.toLowerCase()
                        )
                      ) {
                        if (!location.href.includes("peterthomasroth")) {
                          if (!/default/gm.test(x.src.toLowerCase())) {
                            if (location.href.includes("herocosmetics")) {
                              return /accentuate/.test(x.src.toLowerCase());
                            } else if (
                              location.href.includes("rodanandfields.com")
                            ) {
                              return !/desktop/.test(x.src.toLowerCase());
                            } else {
                              return true;
                            }
                          }
                        } else {
                          return true;
                        }
                      }
                    }
                  })
                  .filter(
                    (x) =>
                      x.src.includes("jpg") ||
                      x.src.includes("jpeg") ||
                      x.src.includes("png") ||
                      x.src.includes("ashx")
                  )[0]
              ) {
                if (
                  imageTagArr
                    .concat(imageBackgroundURLArr)
                    .sort(
                      (a, b) =>
                        b.scrollWidth * b.scrollHeight -
                        a.scrollWidth * a.scrollHeight
                    )
                    .filter((x) => {
                      if (x.src) {
                        if (
                          !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library|video|tiny/gm.test(
                            x.src.toLowerCase()
                          )
                        ) {
                          if (!location.href.includes("peterthomasroth")) {
                            if (!/default/gm.test(x.src.toLowerCase())) {
                              if (location.href.includes("herocosmetics")) {
                                return /accentuate/.test(x.src.toLowerCase());
                              } else if (
                                location.href.includes("rodanandfields.com")
                              ) {
                                return !/desktop/.test(x.src.toLowerCase());
                              } else {
                                return true;
                              }
                            }
                          } else {
                            return true;
                          }
                        }
                      }
                    })
                    .filter(
                      (x) =>
                        x.src.includes("jpg") ||
                        x.src.includes("jpeg") ||
                        x.src.includes("png") ||
                        x.src.includes("ashx")
                    )[0].src
                ) {
                  return imageTagArr
                    .concat(imageBackgroundURLArr)
                    .sort(
                      (a, b) =>
                        b.scrollWidth * b.scrollHeight -
                        a.scrollWidth * a.scrollHeight
                    )
                    .filter((x) => {
                      if (x.src) {
                        if (
                          !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library|video|tiny/gm.test(
                            x.src.toLowerCase()
                          )
                        )
                          if (!location.href.includes("peterthomasroth")) {
                            if (!/default/gm.test(x.src.toLowerCase())) {
                              if (location.href.includes("herocosmetics")) {
                                return /accentuate/.test(x.src.toLowerCase());
                              } else if (
                                location.href.includes("rodanandfields.com")
                              ) {
                                return !/desktop/.test(x.src.toLowerCase());
                              } else {
                                return true;
                              }
                            }
                          } else {
                            return true;
                          }
                      }
                    })
                    .filter(
                      (x) =>
                        x.src.includes("jpg") ||
                        x.src.includes("jpeg") ||
                        x.src.includes("png") ||
                        x.src.includes("ashx")
                    )[0].src;
                } else {
                  return imageTagArr
                    .concat(imageBackgroundURLArr)
                    .sort(
                      (a, b) =>
                        b.scrollWidth * b.scrollHeight -
                        a.scrollWidth * a.scrollHeight
                    )
                    .filter((x) => {
                      if (x) {
                        if (
                          !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library|video|tiny/gm.test(
                            x.toLowerCase()
                          )
                        ) {
                          if (!location.href.includes("peterthomasroth")) {
                            if (!/default/gm.test(x.toLowerCase())) {
                              if (location.href.includes("herocosmetics")) {
                                return /accentuate/.test(x.toLowerCase());
                              } else if (
                                location.href.includes("rodanandfields.com")
                              ) {
                                return !/desktop/.test(x.toLowerCase());
                              } else {
                                return true;
                              }
                            }
                          } else {
                            return true;
                          }
                        }
                      }
                    })
                    .filter(
                      (x) =>
                        x.src.includes("jpg") ||
                        x.src.includes("jpeg") ||
                        x.src.includes("png") ||
                        x.src.includes("ashx")
                    )[0];
                }
              }
            } else {
              if (
                imageTagArr
                  .sort(
                    (a, b) =>
                      b.scrollWidth * b.scrollHeight -
                      a.scrollWidth * a.scrollHeight
                  )
                  .filter((x) => {
                    if (x.src) {
                      if (
                        !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library|video|tiny/gm.test(
                          x.src.toLowerCase()
                        )
                      ) {
                        if (!location.href.includes("peterthomasroth")) {
                          if (!/default/gm.test(x.src.toLowerCase())) {
                            if (location.href.includes("herocosmetics")) {
                              return /accentuate/.test(x.src.toLowerCase());
                            } else if (
                              location.href.includes("rodanandfields.com")
                            ) {
                              return !/desktop/.test(x.src.toLowerCase());
                            } else {
                              return true;
                            }
                          }
                        } else {
                          return truel;
                        }
                      }
                    }
                  })
                  .filter(
                    (x) =>
                      x.src.includes("jpg") ||
                      x.src.includes("jpeg") ||
                      x.src.includes("png") ||
                      x.src.includes("ashx")
                  )[0]
              ) {
                if (
                  imageTagArr
                    .sort(
                      (a, b) =>
                        b.scrollWidth * b.scrollHeight -
                        a.scrollWidth * a.scrollHeight
                    )
                    .filter((x) => {
                      if (x.src) {
                        if (
                          !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library|video|tiny/gm.test(
                            x.src.toLowerCase()
                          )
                        ) {
                          if (!location.href.includes("peterthomasroth")) {
                            if (!/default/gm.test(x.src.toLowerCase())) {
                              if (location.href.includes("herocosmetics")) {
                                return /accentuate/.test(x.src.toLowerCase());
                              } else if (
                                location.href.includes("rodanandfields.com")
                              ) {
                                return !/desktop/.test(x.src.toLowerCase());
                              } else {
                                return true;
                              }
                            }
                          } else {
                            return true;
                          }
                        }
                      }
                    })
                    .filter(
                      (x) =>
                        x.src.includes("jpg") ||
                        x.src.includes("jpeg") ||
                        x.src.includes("png") ||
                        x.src.includes("ashx")
                    )[0].src
                ) {
                  return imageTagArr
                    .sort(
                      (a, b) =>
                        b.scrollWidth * b.scrollHeight -
                        a.scrollWidth * a.scrollHeight
                    )
                    .filter((x) => {
                      if (x.src) {
                        if (
                          !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library|video|tiny/gm.test(
                            x.src.toLowerCase()
                          )
                        ) {
                          if (!location.href.includes("peterthomasroth")) {
                            if (!/default/gm.test(x.src.toLowerCase())) {
                              if (location.href.includes("herocosmetics")) {
                                return /accentuate/.test(x.src.toLowerCase());
                              } else if (
                                location.href.includes("rodanandfields.com")
                              ) {
                                return !/desktop/.test(x.src.toLowerCase());
                              } else {
                                return true;
                              }
                            }
                          } else {
                            return true;
                          }
                        }
                      }
                    })
                    .filter(
                      (x) =>
                        x.src.includes("jpg") ||
                        x.src.includes("jpeg") ||
                        x.src.includes("png") ||
                        x.src.includes("ashx")
                    )[0].src;
                } else {
                  return null;
                }
              }
            }
          } else {
            return null;
          }
        });

        await browser.close();
      })
      .catch((err) => {
        console.log(err);
      });

    if (largest_image) {
      if (
        !largest_image.includes("http://") &&
        !largest_image.includes("https://") &&
        !largest_image.includes(".com")
      ) {
        mainImage = baseURL + largest_image.slice(largest_image.indexOf("/"));
      } else {
        mainImage = largest_image;
      }

      mainImage = regexMatchReplaceFunction(mainImage);
    }

    let cheerioImageArr = [];

    cheerioPuppeteerImages.each((index, item) => {
      cheerioImageEachFuction(cheerioImageArr, index, item);
    });

    let mainCheerioImage = cheerioImageArr
      .filter(
        (x) =>
          !altURLExactMatchArr.map((item) => item.source).includes(x.source)
      )
      .filter((x) => x.matches >= 2)
      .filter((x) => !whiteSpaceRegex.test(x.source))
      .filter(
        (x) =>
          !/logo|svg|spacer|loader|gif|bat\.bing|emstore.com_.jpg|badges|dummy|how|to_go|placeholder|tiny|review|banner|icon|typographic|stamped.io|sweetcef|bazaarvoice|editor|results|before|steps|subnav|btn|kiehls_us-library/gm.test(
            x.source.toLowerCase()
          ) &&
          (baseURL.includes("peterthomasroth")
            ? true
            : !/default/gm.test(x.source.toLowerCase()))
      );

    if (
      !baseURL.includes("glamglow") &&
      !baseURL.includes("ulta") &&
      !baseURL.includes("mariobadescu") &&
      !baseURL.includes("aquaphorus") &&
      !baseURL.includes("oneloveorganics.com") &&
      !baseURL.includes("alaffia.com") &&
      !baseURL.includes("emstore.com") &&
      !baseURL.includes("miirushop.com") &&
      !baseURL.includes("glowieco.com") &&
      !baseURL.includes("stylekorean.com") &&
      !baseURL.includes("edenbelle.com") &&
      !baseURL.includes("rodanandfields.com") &&
      !baseURL.includes("ponds.com") &&
      !baseURL.includes("molecular-cosmetics.com") &&
      !baseURL.includes("cerave.com") &&
      !baseURL.includes("generationclay.com") &&
      !baseURL.includes("katesomerville.com")
    ) {
      if (mainCheerioImage) {
        if (!baseURL.includes("blissworld.com")) {
          if (mainCheerioImage[0]) {
            if (mainCheerioImage[0].source) {
              mainCheerioImage = mainCheerioImage[0].source;
            }
          }
        } else {
          if (mainCheerioImage[1]) {
            if (mainCheerioImage[1].source) {
              mainCheerioImage = mainCheerioImage[1].source;
            }
          }
        }
      }
    }

    if (
      mainCheerioImage &&
      typeof mainCheerioImage === "string" &&
      !baseURL.includes("glamglow") &&
      !baseURL.includes("ulta") &&
      !baseURL.includes("mariobadescu") &&
      !baseURL.includes("aquaphorus") &&
      !baseURL.includes("oneloveorganics.com") &&
      !baseURL.includes("alaffia.com") &&
      !baseURL.includes("emstore.com") &&
      !baseURL.includes("miirushop.com") &&
      !baseURL.includes("glowieco.com") &&
      !baseURL.includes("stylekorean.com") &&
      !baseURL.includes("edenbelle.com") &&
      !baseURL.includes("rodanandfields.com") &&
      !baseURL.includes("ponds.com") &&
      !baseURL.includes("molecular-cosmetics.com") &&
      !baseURL.includes("cerave.com") &&
      !baseURL.includes("generationclay.com") &&
      !baseURL.includes("katesomerville.com")
    ) {
      if (
        !mainCheerioImage.includes("http://") &&
        !mainCheerioImage.includes("https://") &&
        !mainCheerioImage.includes(".com")
      ) {
        mainCheerioImage =
          baseURL + mainCheerioImage.slice(mainCheerioImage.indexOf("/"));
      }

      mainImage = regexMatchReplaceFunction(mainCheerioImage);
    } else if (!largest_image) {
      let newCheerioImageArr = [];

      cheerioPuppeteerImages.each((index, item) => {
        const source = item.attribs.src;
        const dataSource = item.attribs["data-src"];

        if (source) {
          newCheerioImageArr.push(source);
        } else {
          if (dataSource) {
            newCheerioImageArr.push(dataSource);
          }
        }
      });

      mainCheerioImage = newCheerioImageArr.sort(
        (a, b) => b.length - a.length
      )[0];

      if (mainCheerioImage) {
        if (
          !mainCheerioImage.includes("http://") &&
          !mainCheerioImage.includes("https://") &&
          !mainCheerioImage.includes(".com")
        ) {
          mainCheerioImage = baseURL + mainCheerioImage;
        }

        mainImage = mainCheerioImage;
      }
    }
  }
  return mainImage;
};

module.exports = imageFinderFunction;
