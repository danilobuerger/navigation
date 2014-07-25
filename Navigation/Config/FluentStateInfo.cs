﻿using System;
using System.Collections.Generic;
using System.Reflection;

namespace Navigation
{
	public class FluentStateInfo
	{
		private List<IFluentDialog> _Dialogs = new List<IFluentDialog>();

		public FluentDialog<TStates, TInitial> Dialog<TStates, TInitial>(string key, TStates states, Func<TStates, TInitial> initial)
			where TStates : class
			where TInitial : FluentState
		{
			var dialog = new FluentDialog<TStates, TInitial>(this, key, states, initial(states));
			_Dialogs.Add(dialog);
			return dialog;
		}

		public void Build()
		{
			StateInfoCollection<Dialog> dialogs = new StateInfoCollection<Dialog>();
			Dialog dialog;
			int dialogIndex = 0;
			foreach (var fluentDialog in _Dialogs)
			{
				dialog = new Dialog();
				dialog.Index = dialogIndex;
				dialogIndex++;
				ProcessStates(dialog, fluentDialog);
				ProcessTransitions(dialog, fluentDialog);
			}
		}

		private static void ProcessStates(Dialog dialog, IFluentDialog fluentDialog)
		{
			State state;
			FluentState fluentState;
			int stateIndex = 0;
			var fluentStates = fluentDialog.States.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public);
			foreach (var stateProperty in fluentStates)
			{
				state = new State();
				fluentState = (FluentState)stateProperty.GetValue(fluentDialog.States);
				fluentState.Key = stateProperty.Name;
				state.Parent = dialog;
				state.Index = stateIndex;
				stateIndex++;
				state.Key = fluentState.Key;
			}
		}

		private static void ProcessTransitions(Dialog dialog, IFluentDialog fluentDialog)
		{
			State state;
			Transition transition;
			int transitionIndex = 0;
			var fluentStates = fluentDialog.States.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public);
			foreach (var stateProperty in fluentStates)
			{
				state = dialog.States[stateProperty.Name];
				transition = new Transition();
				transition.Parent = state;
				transition.Index = transitionIndex;
				transitionIndex++;
			}
		}
	}
}
