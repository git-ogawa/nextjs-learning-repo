import React from "react"

export function GithubIcon() {
  return (
    <div>
      <svg role='img' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' stroke='currentColor' className='size-10'>
        <title>GitHub</title>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
        />
      </svg>
    </div>
  )
}

export function ProjectIcon(className) {
  return (
    <div className={className}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        version='1.1'
        viewBox='0 0 140 140'
        className={className}
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <defs />
        <rect fill='#ffffff' width='100%' height='100%' x='0' y='0' />
        <g>
          <g data-cell-id='0'>
            <g data-cell-id='1'>
              <g data-cell-id='Pl00eCiiLzWOpuDl3vzT-1'>
                <g>
                  <ellipse cx='70' cy='70' rx='70' ry='70' fill='rgb(255, 255, 255)' stroke='rgb(0, 0, 0)' pointerEvents='all' />
                </g>
                <g>
                  <g transform='translate(-0.5 -0.5)'>
                    <switch>
                      <foreignObject
                        pointerEvents='none'
                        width='100%'
                        height='100%'
                        requiredFeatures='http://www.w3.org/TR/SVG11/feature#Extensibility'
                        style={{ overflow: "visible", textAlign: "left" }}
                      >
                        <div
                          xmlns='http://www.w3.org/1999/xhtml'
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "138px",
                            height: "1px",
                            paddingTop: "70px",
                            marginLeft: "1px",
                          }}
                        >
                          <div data-drawio-colors='color: rgb(0, 0, 0); ' style={{ boxSizing: "border-box", fontSize: "0px", textAlign: "center" }}>
                            <div
                              style={{
                                display: "inline-block",
                                fontSize: "12px",
                                fontFamily: "Helvetica",
                                color: "rgb(0, 0, 0)",
                                lineHeight: "1.2",
                                pointerEvents: "all",
                                whiteSpace: "normal",
                                overflowWrap: "normal",
                              }}
                            >
                              <font style={{ fontSize: "20px" }}>Logo Sample</font>
                            </div>
                          </div>
                        </div>
                      </foreignObject>
                      <image
                        x='1'
                        y='58.5'
                        xlinkHref='data:image/png;base64,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'
                      />
                    </switch>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
