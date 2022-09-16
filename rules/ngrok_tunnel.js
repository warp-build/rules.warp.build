import NgrokToolchain from "https://pkgs.warp.build/toolchains/ngrok.js"

const impl = ctx => {
  const { label, args} = ctx.cfg()
  ctx.action().declareOutputs([])
  ctx.action().runShell({
    script: `#!/bin/bash -xe
    ${NgrokToolchain.provides().NGROK} ${args.join(" ")}
    `
  })
}

export default Warp.Rule({
  runnable: true,
  name: "https://pkgs.warp.build/rules/ngrok_tunnel",
  mnemonic: "NgrokTunel",
  impl,
  cfg: {
    name: label(),
    args: [string()],
    deps: [label()],
  },
	defaults: {
		deps: [],
	},
  toolchains: [NgrokToolchain]
})
